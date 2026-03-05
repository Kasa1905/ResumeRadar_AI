"""LinkedIn profile parsing service."""
import re
import httpx
from typing import Optional, Dict, List, Tuple
from models import LinkedInProfile


class InvalidLinkedInURLError(Exception):
    """Raised when LinkedIn URL is invalid."""
    pass


class ProfileNotFoundError(Exception):
    """Raised when LinkedIn profile is not found."""
    pass


class LinkedInService:
    """Service for fetching and parsing LinkedIn profiles."""

    async def extract_profile_id(self, url: str) -> str:
        """
        Extract the profile identifier from LinkedIn URL.
        Accepts formats:
        - https://www.linkedin.com/in/username
        - https://linkedin.com/in/username/
        - linkedin.com/in/username
        """
        if not url:
            raise InvalidLinkedInURLError("URL cannot be empty")

        # Normalize URL
        url = url.strip().lower()
        if not url.startswith("http"):
            url = "https://" + url

        # Validate LinkedIn domain
        pattern = r"https?://(?:www\.)?linkedin\.com/in/([a-zA-Z0-9\-]+)/?.*"
        match = re.match(pattern, url)

        if not match:
            raise InvalidLinkedInURLError(
                "Invalid LinkedIn profile URL. Use format: https://linkedin.com/in/username"
            )

        profile_id = match.group(1)
        if not profile_id:
            raise InvalidLinkedInURLError("Profile ID cannot be empty")

        return profile_id

    async def fetch_linkedin_profile(
        self, url: str
    ) -> Tuple[Dict[str, int], LinkedInProfile]:
        """
        Fetch LinkedIn profile and extract structured data.
        
        Note: LinkedIn heavily restricts scraping. This implementation provides
        a structure for integration with LinkedIn APIs or authorized scraping solutions.
        
        Returns:
            Tuple of (aggregated counts, profile data)
        """
        profile_id = await self.extract_profile_id(url)

        # LinkedIn restricts web scraping. In production, you would:
        # 1. Use LinkedIn Official API (requires OAuth)
        # 2. Use authorized third-party services
        # 3. Implement authenticated scraping with user consent
        
        # For now, we'll return a structured response indicating
        # that direct scraping is not available
        async with httpx.AsyncClient() as client:
            try:
                # Attempt to verify profile exists
                response = await client.get(
                    f"https://www.linkedin.com/in/{profile_id}",
                    headers={
                        "User-Agent": "Mozilla/5.0 (compatible; ResumeRadar/1.0)"
                    },
                    timeout=10.0,
                    follow_redirects=True
                )

                # LinkedIn returns 200 even for non-existent profiles (login page)
                # We'll check if we're redirected to login or if profile exists
                if "authwall" in response.url.path or "login" in response.url.path:
                    # Profile exists but requires authentication
                    # Return structured placeholder data
                    return self._create_placeholder_profile(profile_id)
                
                if response.status_code == 404:
                    raise ProfileNotFoundError(
                        f"LinkedIn profile '{profile_id}' not found"
                    )

                # If we got here, attempt to parse (will be limited)
                return await self._parse_profile_html(response.text, profile_id)

            except httpx.RequestError:
                raise ProfileNotFoundError(
                    f"Could not reach LinkedIn profile '{profile_id}'"
                )

    def _create_placeholder_profile(
        self, profile_id: str
    ) -> Tuple[Dict[str, int], LinkedInProfile]:
        """
        Create placeholder profile structure when direct access is restricted.
        This indicates that LinkedIn API integration is needed.
        """
        aggregated = {
            "total_certifications": 0,
            "total_roles": 0,
        }

        profile = LinkedInProfile(
            profile_id=profile_id,
            certifications=[],
            roles=[],
            access_note="LinkedIn profile access requires authentication. "
                       "Please use LinkedIn Official API for full profile data."
        )

        return aggregated, profile

    async def _parse_profile_html(
        self, html: str, profile_id: str
    ) -> Tuple[Dict[str, int], LinkedInProfile]:
        """
        Parse LinkedIn HTML to extract certifications and roles.
        
        Note: This is a basic implementation. LinkedIn's HTML structure
        requires authentication and frequently changes.
        """
        # Basic pattern matching for publicly visible data
        certifications = self._extract_certifications(html)
        roles = self._extract_roles(html)

        aggregated = {
            "total_certifications": len(certifications),
            "total_roles": len(roles),
        }

        profile = LinkedInProfile(
            profile_id=profile_id,
            certifications=certifications,
            roles=roles,
            access_note="Limited public data available. "
                       "Use LinkedIn API for comprehensive profile information."
        )

        return aggregated, profile

    def _extract_certifications(self, html: str) -> List[Dict[str, str]]:
        """Extract certification information from HTML."""
        certifications = []
        
        # Pattern for JSON-LD or structured data
        # LinkedIn may include some structured data in public profiles
        cert_pattern = r'"name":"([^"]+)".*?"issuingOrganization".*?"name":"([^"]+)"'
        matches = re.findall(cert_pattern, html, re.DOTALL)
        
        for match in matches[:10]:  # Limit to 10 certifications
            certifications.append({
                "name": match[0],
                "issuer": match[1]
            })

        return certifications

    def _extract_roles(self, html: str) -> List[Dict[str, str]]:
        """Extract role/position information from HTML."""
        roles = []
        
        # Pattern for job titles and companies
        role_pattern = r'"title":"([^"]+)".*?"companyName":"([^"]+)"'
        matches = re.findall(role_pattern, html, re.DOTALL)
        
        for match in matches[:10]:  # Limit to 10 roles
            roles.append({
                "title": match[0],
                "company": match[1]
            })

        return roles
