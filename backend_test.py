import requests
import unittest
import json
from datetime import datetime

class EtanaInteriorsAPITest(unittest.TestCase):
    def __init__(self, *args, **kwargs):
        super(EtanaInteriorsAPITest, self).__init__(*args, **kwargs)
        # Use the public endpoint from frontend/.env
        self.base_url = "https://19ad5cbd-34ca-4afe-a157-502fa5445143.preview.emergentagent.com"
        self.test_timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    
    def test_01_health_check(self):
        """Test the health check endpoint"""
        print("\n🔍 Testing health check endpoint...")
        response = requests.get(f"{self.base_url}/api/health")
        
        self.assertEqual(response.status_code, 200, f"Expected status code 200, got {response.status_code}")
        data = response.json()
        self.assertEqual(data["status"], "healthy", "Health check should return 'healthy' status")
        self.assertEqual(data["service"], "Etana Interiors API", "Service name should be 'Etana Interiors API'")
        print("✅ Health check endpoint test passed")
    
    def test_02_get_services(self):
        """Test the services endpoint"""
        print("\n🔍 Testing services endpoint...")
        response = requests.get(f"{self.base_url}/api/services")
        
        self.assertEqual(response.status_code, 200, f"Expected status code 200, got {response.status_code}")
        data = response.json()
        self.assertIn("services", data, "Response should contain 'services' key")
        self.assertIsInstance(data["services"], list, "Services should be a list")
        self.assertGreaterEqual(len(data["services"]), 1, "Should have at least one service")
        
        # Check service structure
        service = data["services"][0]
        self.assertIn("id", service, "Service should have an 'id'")
        self.assertIn("name", service, "Service should have a 'name'")
        self.assertIn("description", service, "Service should have a 'description'")
        print("✅ Services endpoint test passed")
    
    def test_03_get_company_info(self):
        """Test the company info endpoint"""
        print("\n🔍 Testing company info endpoint...")
        response = requests.get(f"{self.base_url}/api/company")
        
        self.assertEqual(response.status_code, 200, f"Expected status code 200, got {response.status_code}")
        data = response.json()
        self.assertIn("name", data, "Response should contain 'name' key")
        self.assertEqual(data["name"], "Etana Interiors", "Company name should be 'Etana Interiors'")
        self.assertIn("email", data, "Response should contain 'email' key")
        self.assertEqual(data["email"], "sales@etanainteriors.co.ke", "Email should match")
        self.assertIn("phone", data, "Response should contain 'phone' key")
        self.assertEqual(data["phone"], "+254700188923", "Phone should match")
        self.assertIn("instagram", data, "Response should contain 'instagram' key")
        print("✅ Company info endpoint test passed")
    
    def test_04_submit_contact_form(self):
        """Test the contact form submission endpoint"""
        print("\n🔍 Testing contact form submission...")
        test_data = {
            "name": f"Test User {self.test_timestamp}",
            "email": f"test{self.test_timestamp}@example.com",
            "phone": "+1234567890",
            "service": "furniture",
            "message": "This is a test message from the API test suite."
        }
        
        response = requests.post(f"{self.base_url}/api/contact", json=test_data)
        
        self.assertEqual(response.status_code, 200, f"Expected status code 200, got {response.status_code}")
        data = response.json()
        self.assertIn("success", data, "Response should contain 'success' key")
        self.assertTrue(data["success"], "Success should be true")
        self.assertIn("message", data, "Response should contain 'message' key")
        self.assertIn("contact_id", data, "Response should contain 'contact_id' key")
        
        # Store contact_id for later tests
        self.contact_id = data["contact_id"]
        print("✅ Contact form submission test passed")
    
    def test_05_get_contacts(self):
        """Test the get contacts endpoint"""
        print("\n🔍 Testing get contacts endpoint...")
        response = requests.get(f"{self.base_url}/api/contacts")
        
        self.assertEqual(response.status_code, 200, f"Expected status code 200, got {response.status_code}")
        data = response.json()
        self.assertIn("contacts", data, "Response should contain 'contacts' key")
        self.assertIsInstance(data["contacts"], list, "Contacts should be a list")
        
        # Check if our submitted contact is in the list
        if hasattr(self, 'contact_id'):
            found = False
            for contact in data["contacts"]:
                if contact.get("id") == self.contact_id:
                    found = True
                    break
            self.assertTrue(found, "Submitted contact should be in the contacts list")
        print("✅ Get contacts endpoint test passed")
    
    def test_06_get_contact_by_id(self):
        """Test the get contact by ID endpoint"""
        if not hasattr(self, 'contact_id'):
            self.skipTest("No contact_id available from previous test")
        
        print(f"\n🔍 Testing get contact by ID endpoint for ID: {self.contact_id}...")
        response = requests.get(f"{self.base_url}/api/contacts/{self.contact_id}")
        
        self.assertEqual(response.status_code, 200, f"Expected status code 200, got {response.status_code}")
        contact = response.json()
        self.assertEqual(contact["id"], self.contact_id, "Contact ID should match")
        self.assertIn("name", contact, "Contact should have a 'name'")
        self.assertIn("email", contact, "Contact should have an 'email'")
        self.assertIn("message", contact, "Contact should have a 'message'")
        print("✅ Get contact by ID endpoint test passed")
    
    def test_07_update_contact_status(self):
        """Test the update contact status endpoint"""
        if not hasattr(self, 'contact_id'):
            self.skipTest("No contact_id available from previous test")
        
        print(f"\n🔍 Testing update contact status endpoint for ID: {self.contact_id}...")
        response = requests.patch(f"{self.base_url}/api/contacts/{self.contact_id}/status?status=contacted")
        
        self.assertEqual(response.status_code, 200, f"Expected status code 200, got {response.status_code}")
        data = response.json()
        self.assertIn("success", data, "Response should contain 'success' key")
        self.assertTrue(data["success"], "Success should be true")
        
        # Verify the status was updated
        response = requests.get(f"{self.base_url}/api/contacts/{self.contact_id}")
        contact = response.json()
        self.assertEqual(contact["status"], "contacted", "Contact status should be updated to 'contacted'")
        print("✅ Update contact status endpoint test passed")

if __name__ == "__main__":
    unittest.main()