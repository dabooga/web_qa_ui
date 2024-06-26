var express = require('express');
var axios = require('axios');
const pdf_generator = require('../middleware/pdf_generator');
var router = express.Router();
const FormData = require('form-data');
const fs = require('fs');
const { PassThrough } = require('stream');

let json_response_data = {}

router.get('/', async(req, res) => {
  try {
    data = [{'id':1, 'name':"sssssssss"}, {'id':2, 'name':"sdddddd"}]

    res.render('demo', { jsonSprints: data });

  } catch (error) {
    if (error.response){
      console.log(error.response.status)
      if (error.response.status === 401){
        res.render("login", {"error_msg" :"Error token expired"})
      }else{
        res.redirect("/")
      }
    }else{
      console.log(error)
      res.status(500).json({ error: 'Error al consultar la API en Python11' });
    }
  }
});

router.get('/id/:id', async(req, res) => {
  try {

    json_response_data = {
      "end_date": "26/10/2023",
      "id": "0b7bc670-3f27-4a98-931b-680910fb8b4a",
      "qa_acceptance_results": {
          "bugs": {
              "Commons": [
                  {
                      "cause": "Other",
                      "components": "Synchronizer",
                      "key": "SYN-29",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "User called O'Donell can be synchronized"
                  },
                  {
                      "cause": "Dev_Validation",
                      "components": "Synchronizer",
                      "key": "SYN-27",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "/actuator endpoint doesn't work"
                  },
                  {
                      "cause": "Other",
                      "components": "Synchronizer",
                      "key": "SYN-20",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Synchronize changes in group attribute doesn't delete them from pendingSync DB"
                  },
                  {
                      "cause": "Other",
                      "components": "Synchronizer",
                      "key": "SYN-18",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "An error in the synchronization of a user loses the relationship of this user with an already synchronized group"
                  },
                  {
                      "cause": null,
                      "components": "SVD Bridge",
                      "key": "SVD-6",
                      "notes": "Zendesk -15620",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Error validación NIF"
                  },
                  {
                      "cause": "Infrastructure",
                      "components": "NebulaUsersCore",
                      "key": "NUC-62",
                      "notes": "",
                      "priority": "Blocker",
                      "status": "Done",
                      "summary": "For delete tenant functionality maximum number of entries per request must be 10"
                  },
                  {
                      "cause": null,
                      "components": "Nebula ID Registration Authority Server",
                      "key": "NIDRAS-256",
                      "notes": "Zendesk -15840",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Error en ordenación"
                  },
                  {
                      "cause": null,
                      "components": "Nebula ID Registration Authority Server",
                      "key": "NIDRAS-253",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "/v2/certificate/request: \"code\":500,\"error\":\"CODE_INTERNAL_ERROR_RA\",\"message\":\"{\\\"code\\\":\\\"11\\\",\\\"message\\\":\\\"Invalid parameter 'prefix' [+805"
                  }
              ],
              "Core": [],
              "Heyday": [
                  {
                      "cause": null,
                      "components": "Frontend Web Access",
                      "key": "WWA-16",
                      "notes": "",
                      "priority": "Low",
                      "status": "Done",
                      "summary": "& character is not being skipped when performing a filter by name"
                  }
              ],
              "Nakama": [
                  {
                      "cause": null,
                      "components": "XADES",
                      "key": "XADES-52",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "\"Sign cert id\" treated as float in audit"
                  },
                  {
                      "cause": "Dev_Validation",
                      "components": "PADES",
                      "key": "PADES-137",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Incorrect OID for SHA1 signatures"
                  },
                  {
                      "cause": "Regression",
                      "components": "NebulaSignCore",
                      "key": "NSC-220",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Visual Signature do not audit correctly in a process"
                  },
                  {
                      "cause": "Other",
                      "components": "NebulaSignCore",
                      "key": "NSC-213",
                      "notes": "",
                      "priority": "Blocker",
                      "status": "Done",
                      "summary": "Any admin can delete information of any tenant"
                  },
                  {
                      "cause": null,
                      "components": "CADES",
                      "key": "CADES-37",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "\"Sign cert id\" treated as float in audit"
                  },
                  {
                      "cause": "Regression",
                      "components": "API Gateway",
                      "key": "APIGW-185",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "cadessign/validate and xadessign/validate do not audit correctly when json do not send companyid"
                  }
              ],
              "Smith": [
                  {
                      "cause": "Other",
                      "components": "Nebula Remote Authentication Bridge",
                      "key": "NRAB-9",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "New msi shall allow the update"
                  },
                  {
                      "cause": "Other",
                      "components": "Nebula Remote Authentication Bridge",
                      "key": "NRAB-8",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Uninstall or update version deletes the config file"
                  },
                  {
                      "cause": "Dev_Validation",
                      "components": "NebulaCertAgent",
                      "key": "NCA-237",
                      "notes": "",
                      "priority": "Blocker",
                      "status": "Done",
                      "summary": "We cannot sign-in Agencia tributaria: Curl : (35) error:0A080006: SSL routines::EVP lib"
                  },
                  {
                      "cause": "Dev_Validation",
                      "components": "NebulaCertAgent",
                      "key": "NCA-236",
                      "notes": "",
                      "priority": "Blocker",
                      "status": "Done",
                      "summary": "Linux - It is not possible to load libpkcs11.so lib on Firefox \"no es posible añadir el modulo\""
                  },
                  {
                      "cause": "Documentation",
                      "components": "NebulaCertAgent",
                      "key": "NCA-234",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Improve Linux user guide"
                  },
                  {
                      "cause": null,
                      "components": "LDAPSynchronizer",
                      "key": "LDAPS-41",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Client does not show available commands in console"
                  },
                  {
                      "cause": null,
                      "components": "LDAPSynchronizer",
                      "key": "LDAPS-40",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Encrypted passwords in configuration file do not work"
                  },
                  {
                      "cause": "Dev_Validation",
                      "components": "LDAPSynchronizer",
                      "key": "LDAPS-39",
                      "notes": "",
                      "priority": "Blocker",
                      "status": "Done",
                      "summary": "Infinite loop if some synchronization fail"
                  },
                  {
                      "cause": "Other",
                      "components": "LDAPSynchronizer",
                      "key": "LDAPS-38",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Incorrect AD admin name in logs"
                  },
                  {
                      "cause": "Other",
                      "components": "LDAPSynchronizer",
                      "key": "LDAPS-31",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "New msi shall allow the update"
                  },
                  {
                      "cause": "Other",
                      "components": "LDAPSynchronizer",
                      "key": "LDAPS-29",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Improve logs"
                  },
                  {
                      "cause": "Regression",
                      "components": "LDAPSynchronizer",
                      "key": "LDAPS-20",
                      "notes": "",
                      "priority": "Blocker",
                      "status": "Done",
                      "summary": "UserId of AD users are displayed in uppercase"
                  }
              ],
              "Sputnik": [
                  {
                      "cause": "Regression",
                      "components": "NebulaAccessServer",
                      "key": "NEBAS-83",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Tokens are not removed from deleted remote users"
                  },
                  {
                      "cause": "Other",
                      "components": "NebulaAccessServer",
                      "key": "NEBAS-78",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "First authentication succeeded and challenge requested with blocked company"
                  },
                  {
                      "cause": "Dev_Validation",
                      "components": "Metrics Monitoring",
                      "key": "MEMO-27",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Token metrics for synchronized users don't work for duplicated registry"
                  }
              ],
              "Team_Rocket": [
                  {
                      "cause": null,
                      "components": "Validator",
                      "key": "VAL-6",
                      "notes": "",
                      "priority": "Highest",
                      "status": "Done",
                      "summary": "The valid certificates are shown as revoked"
                  },
                  {
                      "cause": null,
                      "components": "SoftwareCertificateService ",
                      "key": "SCS-5",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Error with decentralized software certificate enrollment"
                  },
                  {
                      "cause": "Other",
                      "components": "Profile Manager",
                      "key": "PROMAN-39",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Null Pointer in logs when try to modify a profile"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertCore",
                      "key": "NCC-314",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "CertCore database performance issues"
                  },
                  {
                      "cause": null,
                      "components": "Keystore",
                      "key": "KEYS-55",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Cannot retrieve certificate from database (null or empty array)"
                  },
                  {
                      "cause": null,
                      "components": "KeyCave",
                      "key": "KEYC-85",
                      "notes": "",
                      "priority": "High",
                      "status": "Done",
                      "summary": "Default installation parameters has devel values"
                  },
                  {
                      "cause": "Other",
                      "components": "KeyCave",
                      "key": "KEYC-75",
                      "notes": "",
                      "priority": "Blocker",
                      "status": "Done",
                      "summary": "KC - HA - Signature Time"
                  },
                  {
                      "cause": null,
                      "components": "KeyCave",
                      "key": "KEYC-37",
                      "notes": "",
                      "priority": "Highest",
                      "status": "Done",
                      "summary": "KeyCave Service detected as a trojan by AV"
                  },
                  {
                      "cause": null,
                      "components": "CSC-Api",
                      "key": "CSC-74",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "The value of lang is incorrect when send of request with lang = “es-ES“"
                  },
                  {
                      "cause": null,
                      "components": "CAManager",
                      "key": "CAM-52",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "The \"is delegable\" parameter does not work for profile assignment"
                  },
                  {
                      "cause": null,
                      "components": "API Gateway",
                      "key": "APIGW-184",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Get Delegations request error with invalid value in queryMode parameter"
                  },
                  {
                      "cause": "Other",
                      "components": "API Gateway",
                      "key": "APIGW-181",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Error to enter audit logs in apigateway"
                  },
                  {
                      "cause": null,
                      "components": "API Gateway",
                      "key": "APIGW-174",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "/v2/certificate/request: Profile 0 cannot be obtained"
                  }
              ]
          },
          "internal_tasks": {
              "Commons": [
                  {
                      "cause": null,
                      "components": "Synchronizer",
                      "key": "SYN-24",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "[PM-1699] Tenant customer data purge - Delete synchronizer token",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaUsersCore",
                      "key": "NUC-61",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "[PM-2119] Publish nebulaUSERS objects metrics",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaUsersCore",
                      "key": "NUC-60",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "[PM-2123] Improve notification for new users",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaUsersCore",
                      "key": "NUC-57",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "[PM-1699] Tenant customer data purge. Database operations",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaUsersCore",
                      "key": "NUC-55",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "[PM-1699] Tenant customer data purge",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaIDWeb",
                      "key": "NIDRAW-242",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Update nebulaID web mapping configuration",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "Nebula ID Registration Authority Server",
                      "key": "NIDRAS-252",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "[PM-2124] Improve notifications for approved certificate requests",
                      "type": "Task"
                  }
              ],
              "Heyday": [],
              "Nakama": [
                  {
                      "cause": null,
                      "components": "PADES",
                      "key": "PADES-136",
                      "notes": "Security -PM-2158",
                      "priority": "Highest",
                      "security_link": "Security -PM-2158",
                      "status": "Done",
                      "summary": "Deprecate parameter signatureSize",
                      "type": "Task"
                  }
              ],
              "Smith": [
                  {
                      "cause": null,
                      "components": "LDAPSynchronizer",
                      "key": "LDAPS-16",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "[PM-1917] Support for openLDAP for LDAP synchronization",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "LDAPSynchronizer",
                      "key": "LDAPS-13",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "[PM-1729] Push objects to nebula with the current api",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "LDAPSynchronizer",
                      "key": "LDAPS-9",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Integrate with Windows Service Control Manager",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "LDAPSynchronizer",
                      "key": "LDAPS-7",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "[PM-228] Nested group support for AD",
                      "type": "Task"
                  }
              ],
              "Sputnik": [
                  {
                      "cause": null,
                      "components": "Metrics Monitoring",
                      "key": "MEMO-33",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "[PM-2120] nebulaSUITE object metrics",
                      "type": "Task"
                  }
              ],
              "Team_Rocket": [
                  {
                      "cause": null,
                      "components": "SoftwareCertificateService ",
                      "key": "SCS-9",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "nebulaCERT licencing metrics",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertCore",
                      "key": "NCC-379",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "nebulaCERT licencing metrics",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertCore",
                      "key": "NCC-320",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Save the revocation status in database",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "Keystore",
                      "key": "KEYS-65",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "nebulaCERT licencing metrics",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "KeyManager",
                      "key": "KEYM-31",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "[PM-2135] Import and issuance storage configuration",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "Crypto Service",
                      "key": "CRYPS-66",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Audit internal signHash endpoint",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "Cerberus Service",
                      "key": "CERS-23",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "New column to add sam keys specific data",
                      "type": "Task"
                  }
              ]
          },
          "story": {
              "Heyday": [],
              "Nakama": [],
              "Smith": [],
              "Sputnik": [],
              "Team_Rocket": []
          }
      },
      "qa_sprint_story": {
          "bugs": {
              "Commons": [
                  {
                      "cause": "Other",
                      "components": "Synchronizer",
                      "key": "SYN-29",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "User called O'Donell can be synchronized"
                  },
                  {
                      "cause": "Dev_Validation",
                      "components": "Synchronizer",
                      "key": "SYN-27",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "/actuator endpoint doesn't work"
                  },
                  {
                      "cause": "Other",
                      "components": "Synchronizer",
                      "key": "SYN-20",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Synchronize changes in group attribute doesn't delete them from pendingSync DB"
                  },
                  {
                      "cause": "Other",
                      "components": "Synchronizer",
                      "key": "SYN-18",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "An error in the synchronization of a user loses the relationship of this user with an already synchronized group"
                  },
                  {
                      "cause": null,
                      "components": "SVD Bridge",
                      "key": "SVD-6",
                      "notes": "Zendesk -15620",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Error validación NIF"
                  },
                  {
                      "cause": "Infrastructure",
                      "components": "NebulaUsersCore",
                      "key": "NUC-62",
                      "notes": "",
                      "priority": "Blocker",
                      "status": "Done",
                      "summary": "For delete tenant functionality maximum number of entries per request must be 10"
                  },
                  {
                      "cause": null,
                      "components": "Nebula ID Registration Authority Server",
                      "key": "NIDRAS-256",
                      "notes": "Zendesk -15840",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Error en ordenación"
                  },
                  {
                      "cause": null,
                      "components": "Nebula ID Registration Authority Server",
                      "key": "NIDRAS-253",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "/v2/certificate/request: \"code\":500,\"error\":\"CODE_INTERNAL_ERROR_RA\",\"message\":\"{\\\"code\\\":\\\"11\\\",\\\"message\\\":\\\"Invalid parameter 'prefix' [+805"
                  },
                  {
                      "cause": "Regression",
                      "components": "LoginWeb",
                      "key": "LOGW-21",
                      "notes": "",
                      "priority": "Medium",
                      "status": "IN QA",
                      "summary": "Flow has been changed when an otp is wrong"
                  },
                  {
                      "cause": null,
                      "components": "LoginBack",
                      "key": "LOGB-17",
                      "notes": "",
                      "priority": "Blocker",
                      "status": "IN QA",
                      "summary": "Only one token assigned to a user when token is blocked, User access via UPLDAP"
                  },
                  {
                      "cause": null,
                      "components": "Auth API",
                      "key": "AA-7",
                      "notes": "",
                      "priority": "Medium",
                      "status": "IN QA",
                      "summary": "Auth Operations are available when the User has been blocked/Disabled/Inactive"
                  },
                  {
                      "cause": "Other",
                      "components": "vinSSO",
                      "key": "VINSSO-7",
                      "notes": "",
                      "priority": "Medium",
                      "status": "In PROGRESS",
                      "summary": "Master URL procedure is not working in google chrome browser"
                  },
                  {
                      "cause": null,
                      "components": "Discover",
                      "key": "DISC-1",
                      "notes": "Zendesk -11465",
                      "priority": "Medium",
                      "status": "Not a Bug",
                      "summary": "Componente alert engine de Discover manda correos con URL incorrecta"
                  },
                  {
                      "cause": null,
                      "components": "NebulaSUITE",
                      "key": "SUITE-20",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Sent to QA",
                      "summary": "[Security] Avoid Inyection in this particular call from (api-test.nebulaservice.net)"
                  },
                  {
                      "cause": "Dev_Validation",
                      "components": "NebulaUsersCore",
                      "key": "NUC-63",
                      "notes": "",
                      "priority": "Medium",
                      "status": "To Do",
                      "summary": "/actuator/info endpoint returning 401 in NebulaUsersCore 3.10.0"
                  },
                  {
                      "cause": "Other",
                      "components": "LoginBack",
                      "key": "LOGB-27",
                      "notes": "",
                      "priority": "Medium",
                      "status": "To Do",
                      "summary": "The absence of LDAP authenticator does not generate any audit"
                  }
              ],
              "Core": [
                  {
                      "cause": null,
                      "components": "NebulaIDWeb",
                      "key": "NIDRAW-155",
                      "notes": "",
                      "priority": "Medium",
                      "status": "To Do",
                      "summary": "NIE tags need to be translated to natural language"
                  }
              ],
              "Heyday": [
                  {
                      "cause": null,
                      "components": "Frontend Web Access",
                      "key": "WWA-16",
                      "notes": "",
                      "priority": "Low",
                      "status": "Done",
                      "summary": "& character is not being skipped when performing a filter by name"
                  }
              ],
              "Nakama": [
                  {
                      "cause": null,
                      "components": "XADES",
                      "key": "XADES-52",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "\"Sign cert id\" treated as float in audit"
                  },
                  {
                      "cause": "Dev_Validation",
                      "components": "PADES",
                      "key": "PADES-137",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Incorrect OID for SHA1 signatures"
                  },
                  {
                      "cause": "Regression",
                      "components": "NebulaSignCore",
                      "key": "NSC-220",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Visual Signature do not audit correctly in a process"
                  },
                  {
                      "cause": "Other",
                      "components": "NebulaSignCore",
                      "key": "NSC-213",
                      "notes": "",
                      "priority": "Blocker",
                      "status": "Done",
                      "summary": "Any admin can delete information of any tenant"
                  },
                  {
                      "cause": null,
                      "components": "CADES",
                      "key": "CADES-37",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "\"Sign cert id\" treated as float in audit"
                  },
                  {
                      "cause": "Regression",
                      "components": "API Gateway",
                      "key": "APIGW-185",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "cadessign/validate and xadessign/validate do not audit correctly when json do not send companyid"
                  }
              ],
              "Smith": [
                  {
                      "cause": "Other",
                      "components": "Nebula Remote Authentication Bridge",
                      "key": "NRAB-9",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "New msi shall allow the update"
                  },
                  {
                      "cause": "Other",
                      "components": "Nebula Remote Authentication Bridge",
                      "key": "NRAB-8",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Uninstall or update version deletes the config file"
                  },
                  {
                      "cause": "Dev_Validation",
                      "components": "NebulaCertAgent",
                      "key": "NCA-237",
                      "notes": "",
                      "priority": "Blocker",
                      "status": "Done",
                      "summary": "We cannot sign-in Agencia tributaria: Curl : (35) error:0A080006: SSL routines::EVP lib"
                  },
                  {
                      "cause": "Dev_Validation",
                      "components": "NebulaCertAgent",
                      "key": "NCA-236",
                      "notes": "",
                      "priority": "Blocker",
                      "status": "Done",
                      "summary": "Linux - It is not possible to load libpkcs11.so lib on Firefox \"no es posible añadir el modulo\""
                  },
                  {
                      "cause": "Documentation",
                      "components": "NebulaCertAgent",
                      "key": "NCA-234",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Improve Linux user guide"
                  },
                  {
                      "cause": null,
                      "components": "LDAPSynchronizer",
                      "key": "LDAPS-41",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Client does not show available commands in console"
                  },
                  {
                      "cause": null,
                      "components": "LDAPSynchronizer",
                      "key": "LDAPS-40",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Encrypted passwords in configuration file do not work"
                  },
                  {
                      "cause": "Dev_Validation",
                      "components": "LDAPSynchronizer",
                      "key": "LDAPS-39",
                      "notes": "",
                      "priority": "Blocker",
                      "status": "Done",
                      "summary": "Infinite loop if some synchronization fail"
                  },
                  {
                      "cause": "Other",
                      "components": "LDAPSynchronizer",
                      "key": "LDAPS-38",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Incorrect AD admin name in logs"
                  },
                  {
                      "cause": "Other",
                      "components": "LDAPSynchronizer",
                      "key": "LDAPS-31",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "New msi shall allow the update"
                  },
                  {
                      "cause": "Other",
                      "components": "LDAPSynchronizer",
                      "key": "LDAPS-29",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Improve logs"
                  },
                  {
                      "cause": "Regression",
                      "components": "LDAPSynchronizer",
                      "key": "LDAPS-20",
                      "notes": "",
                      "priority": "Blocker",
                      "status": "Done",
                      "summary": "UserId of AD users are displayed in uppercase"
                  },
                  {
                      "cause": "Other",
                      "components": "LDAPSynchronizer",
                      "key": "LDAPS-30",
                      "notes": "",
                      "priority": "Blocker",
                      "status": "IN QA",
                      "summary": "Retries synchronization if some object is not sent"
                  },
                  {
                      "cause": "Other",
                      "components": "Synchronizer",
                      "key": "SYN-19",
                      "notes": "",
                      "priority": "Medium",
                      "status": "In PROGRESS",
                      "summary": "No gid when group modifies user relationships"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertAgent",
                      "key": "NCA-220",
                      "notes": "Zendesk -15978",
                      "priority": "High",
                      "status": "In PROGRESS",
                      "summary": "New browser extension not registering URL correctly"
                  },
                  {
                      "cause": "Other",
                      "components": "NebulaCertAgent",
                      "key": "NCA-216",
                      "notes": "",
                      "priority": "Medium",
                      "status": "In PROGRESS",
                      "summary": "Adobe crashes if the user has more than 300 certs"
                  },
                  {
                      "cause": null,
                      "components": "LDAPSynchronizer",
                      "key": "LDAPS-33",
                      "notes": "Zendesk -15580",
                      "priority": "Medium",
                      "status": "In PROGRESS",
                      "summary": "Failed to get the configuration from the database"
                  },
                  {
                      "cause": null,
                      "components": "LDAPSynchronizer",
                      "key": "LDAPS-21",
                      "notes": "",
                      "priority": "Blocker",
                      "status": "Not a Bug",
                      "summary": "Sincronization of a user-group relationship that doesn't exist in the AD"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertAgent",
                      "key": "NCA-196",
                      "notes": "",
                      "priority": "Medium",
                      "status": "QA Pending",
                      "summary": "Config-tool validate domain incorrectly"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertAgent",
                      "key": "NCA-195",
                      "notes": "",
                      "priority": "Medium",
                      "status": "QA Pending",
                      "summary": "Invalid login state when ConfigServer points to wrong URL"
                  },
                  {
                      "cause": "Other",
                      "components": "NebulaCertAgent",
                      "key": "NCA-192",
                      "notes": "",
                      "priority": "Medium",
                      "status": "QA Pending",
                      "summary": "Changes with the configuration of the connexion are not working"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertAgent",
                      "key": "NCA-187",
                      "notes": "",
                      "priority": "Medium",
                      "status": "QA Pending",
                      "summary": "Status monitor ask for user+passw login again after input a wrong token."
                  },
                  {
                      "cause": "Dev_Validation",
                      "components": "NebulaCertAgent",
                      "key": "NCA-175",
                      "notes": "",
                      "priority": "Medium",
                      "status": "QA Pending",
                      "summary": "Error authorization groups when the user doesn't belong to the group"
                  },
                  {
                      "cause": "Other",
                      "components": "NebulaCertAgent",
                      "key": "NCA-174",
                      "notes": "",
                      "priority": "Medium",
                      "status": "QA Pending",
                      "summary": "Uninstall nebulaCertAgent creates a file call null in c:\\\\vintegris "
                  },
                  {
                      "cause": "Regression",
                      "components": "NebulaCertAgent",
                      "key": "NCA-157",
                      "notes": "",
                      "priority": "Medium",
                      "status": "QA Pending",
                      "summary": "Users with no-tokens can continue with a second factor authentication"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertAgent",
                      "key": "NCA-114",
                      "notes": "",
                      "priority": "Medium",
                      "status": "QA Pending",
                      "summary": "An error message appears verifying that TLS1.3 signatures are correct"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertAgent",
                      "key": "NCA-103",
                      "notes": "Zendesk -13850",
                      "priority": "Medium",
                      "status": "QA Pending",
                      "summary": "Navegadores cierran al existir muchos certificados en el agente"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertAgent",
                      "key": "NCA-66",
                      "notes": "",
                      "priority": "Medium",
                      "status": "QA Pending",
                      "summary": "nebulaCERTagent - Certificates shows a web alias but it not exists"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertAgent",
                      "key": "NCA-65",
                      "notes": "",
                      "priority": "Medium",
                      "status": "QA Pending",
                      "summary": "It can not be filtered with charachters \"Ö\" and \"Ç\" from agent"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertAgent",
                      "key": "NCA-54",
                      "notes": "Zendesk -13196",
                      "priority": "Medium",
                      "status": "QA Pending",
                      "summary": "Cierre de navegador pseudoaleatoriamente al firmar en SECAD"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertAgent",
                      "key": "NCA-230",
                      "notes": "",
                      "priority": "High",
                      "status": "Rejected",
                      "summary": "No arranca la máquina con la 4.6.1 tras actualizar Windows."
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertAgent",
                      "key": "NCA-219",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Rejected",
                      "summary": "Severe performance degradation with 300 certificates"
                  },
                  {
                      "cause": "Documentation",
                      "components": "Nebula Remote Authentication Bridge",
                      "key": "NRAB-12",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Sent to QA",
                      "summary": "Supported operating systems in doc"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertAgent",
                      "key": "NCA-218",
                      "notes": "",
                      "priority": "High",
                      "status": "Sent to QA",
                      "summary": "No aparece Control de URLs para nebulaCERTagent en el market de Chrome "
                  },
                  {
                      "cause": "User_Story_Description",
                      "components": "NebulaCertAgent",
                      "key": "NCA-159",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Sent to QA",
                      "summary": "RetryAttempts - User cannot input a wrong token code a certain number of times"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertAgent",
                      "key": "NCA-123",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Sent to QA",
                      "summary": "Test tool bugs/tasks"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertAgent",
                      "key": "NCA-64",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Sent to QA",
                      "summary": "It is not audited failed second factor authentication"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertAgent",
                      "key": "NCA-57",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Sent to QA",
                      "summary": "Las funciones CSP devuelven error error_already_exists(183) cuando los Logs están activados"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertAgent",
                      "key": "NCA-55",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Sent to QA",
                      "summary": "It is audited many times SIGNATURE_CREATION operation in nebulaAUDIT"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertAgent",
                      "key": "NCA-45",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Sent to QA",
                      "summary": "PKCS11 - La función C_Verfy y C_VerifyUpdate no devuelven  CKR_SIGNATURE_INVALID"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertAgent",
                      "key": "NCA-31",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Sent to QA",
                      "summary": "KSP vinKSPVerifySignature no retorna ERROR_SUCCESS"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertAgent",
                      "key": "NCA-229",
                      "notes": "",
                      "priority": "Medium",
                      "status": "To Do",
                      "summary": "Problema ACLS 5.0"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertAgent",
                      "key": "NCA-228",
                      "notes": "",
                      "priority": "Medium",
                      "status": "To Do",
                      "summary": "El Agente 5.0 no tiene todas las dlls firmadas: El agente 6.0 debería tenerlas"
                  },
                  {
                      "cause": "Other",
                      "components": "NebulaCertAgent",
                      "key": "NCA-168",
                      "notes": "",
                      "priority": "Medium",
                      "status": "To Do",
                      "summary": "ACL-19 on Firefox get Read Error: "
                  },
                  {
                      "cause": "User_Story_Description",
                      "components": "NebulaCertAgent",
                      "key": "NCA-161",
                      "notes": "",
                      "priority": "Medium",
                      "status": "To Do",
                      "summary": "BlockTime- Once a token has exceed the max number of attempts, the token is blocked and cannot be used in a while"
                  },
                  {
                      "cause": "User_Story_Description",
                      "components": "NebulaCertAgent",
                      "key": "NCA-160",
                      "notes": "",
                      "priority": "Medium",
                      "status": "To Do",
                      "summary": "BlockUser - The user after exceed the max retryAttempts is not blocked"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertAgent",
                      "key": "NCA-102",
                      "notes": "Security -PM-1620",
                      "priority": "Medium",
                      "status": "To Do",
                      "summary": "The file VinURIHandler.exe is not signed"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertAgent",
                      "key": "NCA-67",
                      "notes": "",
                      "priority": "Medium",
                      "status": "To Do",
                      "summary": "Order of installing nebulacert agent/autofirma shall not matter"
                  }
              ],
              "Sputnik": [
                  {
                      "cause": "Regression",
                      "components": "NebulaAccessServer",
                      "key": "NEBAS-83",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Tokens are not removed from deleted remote users"
                  },
                  {
                      "cause": "Other",
                      "components": "NebulaAccessServer",
                      "key": "NEBAS-78",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "First authentication succeeded and challenge requested with blocked company"
                  },
                  {
                      "cause": "Dev_Validation",
                      "components": "Metrics Monitoring",
                      "key": "MEMO-27",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Token metrics for synchronized users don't work for duplicated registry"
                  },
                  {
                      "cause": "Other",
                      "components": "Metrics Monitoring",
                      "key": "MEMO-30",
                      "notes": "",
                      "priority": "Medium",
                      "status": "IN QA",
                      "summary": "Conciliation task doesn't update the deleted objects from access DB"
                  },
                  {
                      "cause": "Other",
                      "components": "Metrics Monitoring",
                      "key": "MEMO-26",
                      "notes": "",
                      "priority": "Medium",
                      "status": "IN QA",
                      "summary": "Some audit entries duplicates rows in metricts table"
                  },
                  {
                      "cause": "Other",
                      "components": "NebulaAccessServer",
                      "key": "NEBAS-37",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Sent to QA",
                      "summary": "Second Authentication may validate blocked users or Company, preventing authentication"
                  },
                  {
                      "cause": null,
                      "components": "NebulaAccessServer",
                      "key": "NEBAS-7",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Sent to QA",
                      "summary": "Authentication error"
                  }
              ],
              "Team_Rocket": [
                  {
                      "cause": null,
                      "components": "Validator",
                      "key": "VAL-6",
                      "notes": "",
                      "priority": "Highest",
                      "status": "Done",
                      "summary": "The valid certificates are shown as revoked"
                  },
                  {
                      "cause": null,
                      "components": "SoftwareCertificateService ",
                      "key": "SCS-5",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Error with decentralized software certificate enrollment"
                  },
                  {
                      "cause": "Other",
                      "components": "Profile Manager",
                      "key": "PROMAN-39",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Null Pointer in logs when try to modify a profile"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertCore",
                      "key": "NCC-314",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "CertCore database performance issues"
                  },
                  {
                      "cause": null,
                      "components": "Keystore",
                      "key": "KEYS-55",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Cannot retrieve certificate from database (null or empty array)"
                  },
                  {
                      "cause": null,
                      "components": "KeyCave",
                      "key": "KEYC-85",
                      "notes": "",
                      "priority": "High",
                      "status": "Done",
                      "summary": "Default installation parameters has devel values"
                  },
                  {
                      "cause": "Other",
                      "components": "KeyCave",
                      "key": "KEYC-75",
                      "notes": "",
                      "priority": "Blocker",
                      "status": "Done",
                      "summary": "KC - HA - Signature Time"
                  },
                  {
                      "cause": null,
                      "components": "KeyCave",
                      "key": "KEYC-37",
                      "notes": "",
                      "priority": "Highest",
                      "status": "Done",
                      "summary": "KeyCave Service detected as a trojan by AV"
                  },
                  {
                      "cause": null,
                      "components": "CSC-Api",
                      "key": "CSC-74",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "The value of lang is incorrect when send of request with lang = “es-ES“"
                  },
                  {
                      "cause": null,
                      "components": "CAManager",
                      "key": "CAM-52",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "The \"is delegable\" parameter does not work for profile assignment"
                  },
                  {
                      "cause": null,
                      "components": "API Gateway",
                      "key": "APIGW-184",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Get Delegations request error with invalid value in queryMode parameter"
                  },
                  {
                      "cause": "Other",
                      "components": "API Gateway",
                      "key": "APIGW-181",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Error to enter audit logs in apigateway"
                  },
                  {
                      "cause": null,
                      "components": "API Gateway",
                      "key": "APIGW-174",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "/v2/certificate/request: Profile 0 cannot be obtained"
                  },
                  {
                      "cause": null,
                      "components": "KeyCave",
                      "key": "KEYC-88",
                      "notes": "",
                      "priority": "Highest",
                      "status": "Not a Bug",
                      "summary": "KeyCave cannot connect tp datanase until restarted."
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertWeb",
                      "key": "NCW-242",
                      "notes": "",
                      "priority": "Medium",
                      "status": "QA FAILED",
                      "summary": "Wrong message when requesting an automatic issue with deprecated keystore profile"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertCore",
                      "key": "NCC-295",
                      "notes": "",
                      "priority": "Blocker",
                      "status": "QA FAILED",
                      "summary": "The agent can sign with ACL if the browser extension is disabled"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertCore",
                      "key": "NCC-317",
                      "notes": "Zendesk -15709",
                      "priority": "Medium",
                      "status": "To Do",
                      "summary": "Error en interpretación de ACLs"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertCore",
                      "key": "NCC-311",
                      "notes": "",
                      "priority": "Medium",
                      "status": "To Do",
                      "summary": "Kuid duplicated on failed certificate import operation"
                  },
                  {
                      "cause": "Dev_Validation",
                      "components": "KeyCave",
                      "key": "KEYC-92",
                      "notes": "",
                      "priority": "Medium",
                      "status": "To Do",
                      "summary": "Bad unload Key"
                  },
                  {
                      "cause": "Regression",
                      "components": "KeyCave",
                      "key": "KEYC-66",
                      "notes": "",
                      "priority": "Medium",
                      "status": "To Do",
                      "summary": "keycave-installer-1.4.1.3-RC.msi does not keep the old configuration"
                  }
              ]
          },
          "g_bug_pro_status": {
              "CSC-Api": {
                  "done": 0,
                  "pending": 1
              },
              "Crypto Service": {
                  "done": 1,
                  "pending": 0
              },
              "Frontend Web Access": {
                  "done": 1,
                  "pending": 0
              },
              "LDAPSynchronizer": {
                  "done": 3,
                  "pending": 1
              },
              "Metrics Monitoring": {
                  "done": 0,
                  "pending": 1
              },
              "Nebula Credential Provider": {
                  "done": 0,
                  "pending": 1
              },
              "Nebula Remote Authentication Bridge": {
                  "done": 0,
                  "pending": 1
              },
              "NebulaAccessServer": {
                  "done": 3,
                  "pending": 2
              },
              "NebulaCertAgent": {
                  "done": 3,
                  "pending": 1
              },
              "NebulaCertCore": {
                  "done": 1,
                  "pending": 0
              },
              "NebulaIDWeb": {
                  "done": 0,
                  "pending": 1
              },
              "NebulaUsersCore": {
                  "done": 0,
                  "pending": 1
              },
              "PADES": {
                  "done": 1,
                  "pending": 1
              },
              "Product Education": {
                  "done": 3,
                  "pending": 2
              },
              "Synchronizer": {
                  "done": 2,
                  "pending": 2
              }
          },
          "g_bug_project": {
              "CSC-Api": 1,
              "Crypto Service": 1,
              "Frontend Web Access": 1,
              "LDAPSynchronizer": 4,
              "Metrics Monitoring": 1,
              "Nebula Credential Provider": 1,
              "Nebula Remote Authentication Bridge": 1,
              "NebulaAccessServer": 5,
              "NebulaCertAgent": 4,
              "NebulaCertCore": 1,
              "NebulaIDWeb": 1,
              "NebulaUsersCore": 1,
              "PADES": 2,
              "Product Education": 5,
              "Synchronizer": 4
          },
          "g_bug_team_cause": {
              "Commons": {
                  "Dev_Validation": 2,
                  "Other": 3,
                  "Regression": 1,
                  "not_cause": 1
              },
              "Heyday": {
                  "Dev_Validation": 1,
                  "not_cause": 0
              },
              "Nakama": {
                  "Other": 2,
                  "not_cause": 0
              },
              "Smith": {
                  "Documentation": 4,
                  "Other": 4,
                  "Regression": 1,
                  "not_cause": 1
              },
              "Sputnik": {
                  "Dev_Validation": 4,
                  "Documentation": 1,
                  "Regression": 1,
                  "not_cause": 1
              },
              "Team_Rocket": {
                  "Dev_Validation": 2,
                  "Infrastructure": 1,
                  "not_cause": 1
              },
              "not_asigned": {
                  "not_cause": 5
              }
          },
          "g_bug_type": {
              "Blocker": 8,
              "Medium": 28,
              "Reopened": 10
          },
          "g_bug_typology_byComponent": {
              "CSC-Api": {
                  "blocker": 0,
                  "medium": 1
              },
              "Crypto Service": {
                  "blocker": 1,
                  "medium": 0
              },
              "Frontend Web Access": {
                  "blocker": 0,
                  "medium": 1
              },
              "LDAPSynchronizer": {
                  "blocker": 0,
                  "medium": 4
              },
              "Metrics Monitoring": {
                  "blocker": 0,
                  "medium": 1
              },
              "Nebula Credential Provider": {
                  "blocker": 0,
                  "medium": 1
              },
              "Nebula Remote Authentication Bridge": {
                  "blocker": 0,
                  "medium": 1
              },
              "NebulaAccessServer": {
                  "blocker": 3,
                  "medium": 3
              },
              "NebulaCertAgent": {
                  "blocker": 0,
                  "medium": 4
              },
              "NebulaCertCore": {
                  "blocker": 2,
                  "medium": 0
              },
              "NebulaIDWeb": {
                  "blocker": 0,
                  "medium": 1
              },
              "NebulaUsersCore": {
                  "blocker": 0,
                  "medium": 1
              },
              "PADES": {
                  "blocker": 0,
                  "medium": 2
              },
              "Product Education": {
                  "blocker": 1,
                  "medium": 4
              },
              "Synchronizer": {
                  "blocker": 1,
                  "medium": 4
              }
          },
          "internal_tasks": {
              "Commons": [
                  {
                      "cause": null,
                      "components": "Synchronizer",
                      "key": "SYN-24",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "[PM-1699] Tenant customer data purge - Delete synchronizer token",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaUsersCore",
                      "key": "NUC-61",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "[PM-2119] Publish nebulaUSERS objects metrics",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaUsersCore",
                      "key": "NUC-60",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "[PM-2123] Improve notification for new users",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaUsersCore",
                      "key": "NUC-57",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "[PM-1699] Tenant customer data purge. Database operations",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaUsersCore",
                      "key": "NUC-55",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "[PM-1699] Tenant customer data purge",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaIDWeb",
                      "key": "NIDRAW-242",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Update nebulaID web mapping configuration",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "Nebula ID Registration Authority Server",
                      "key": "NIDRAS-252",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "[PM-2124] Improve notifications for approved certificate requests",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaUsersCore",
                      "key": "NUC-64",
                      "notes": "",
                      "priority": "Medium",
                      "status": "IN QA",
                      "summary": "[PM-2132]   Standard Login Flow",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "LoginWeb",
                      "key": "LOGW-22",
                      "notes": "",
                      "priority": "Medium",
                      "status": "IN QA",
                      "summary": "[PM-2132] Standard Login Flow",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "LoginBack",
                      "key": "LOGB-26",
                      "notes": "",
                      "priority": "Medium",
                      "status": "IN QA",
                      "summary": "[PM-1448] Standard login flow",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "LoginBack",
                      "key": "LOGB-20",
                      "notes": "",
                      "priority": "Medium",
                      "status": "IN QA",
                      "summary": "Improvements for the new login flow",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "SVD Bridge",
                      "key": "SVD-5",
                      "notes": "",
                      "priority": "Medium",
                      "status": "In PROGRESS",
                      "summary": "Setup Prometheus monitoring (SVD BRIDGE)",
                      "type": "Internal"
                  },
                  {
                      "cause": null,
                      "components": "SVD Bridge",
                      "key": "SVD-4",
                      "notes": "",
                      "priority": "Medium",
                      "status": "In PROGRESS",
                      "summary": "Upgrade to JAVA 17 (SVD BRIDGE)",
                      "type": "Internal"
                  },
                  {
                      "cause": null,
                      "components": "NebulaUsersCore",
                      "key": "NUC-58",
                      "notes": "",
                      "priority": "Medium",
                      "status": "In PROGRESS",
                      "summary": "Cache improvements",
                      "type": "Internal"
                  },
                  {
                      "cause": null,
                      "components": "CheckupService",
                      "key": "CHS-51",
                      "notes": "",
                      "priority": "Medium",
                      "status": "In PROGRESS",
                      "summary": "update Checkup service to comunicate with new SVD Bridge docker component (not lamda)",
                      "type": "Internal"
                  },
                  {
                      "cause": null,
                      "components": "TokenService",
                      "key": "TKS-13",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Update JJWT library",
                      "type": "Internal"
                  },
                  {
                      "cause": null,
                      "components": "TokenService",
                      "key": "TKS-9",
                      "notes": "",
                      "priority": "Low",
                      "status": "Done",
                      "summary": "Increase Test Coverage",
                      "type": "Internal"
                  },
                  {
                      "cause": null,
                      "components": "NebulaUsersWeb",
                      "key": "NUW-41",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "[PM-1699] Tenant customer data purge",
                      "type": "Internal"
                  },
                  {
                      "cause": null,
                      "components": "NebulaUsersClient",
                      "key": "NUCL-10",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "[PM-2132]   Standard Login Flow",
                      "type": "Internal"
                  },
                  {
                      "cause": null,
                      "components": "NebulaUsersCore",
                      "key": "NUC-56",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Add to getUser flag to determine if the user is enabled for authentication.",
                      "type": "Internal"
                  }
              ],
              "Heyday": [
                  {
                      "cause": null,
                      "components": "Frontend Web Access",
                      "key": "WWA-12",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Build Pending",
                      "summary": "Microsite Login with standard flow",
                      "type": "Task"
                  }
              ],
              "Nakama": [
                  {
                      "cause": null,
                      "components": "NebulaSignCore",
                      "key": "NSC-223",
                      "notes": "",
                      "priority": "Medium",
                      "status": "In PROGRESS",
                      "summary": "[PM-2145] - Support for sign step and its delegated form",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaSignCore",
                      "key": "NSC-214",
                      "notes": "",
                      "priority": "Medium",
                      "status": "In PROGRESS",
                      "summary": "[PM-2105] Web Basic task list",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "PADES",
                      "key": "PADES-136",
                      "notes": "Security -PM-2158",
                      "priority": "Highest",
                      "security_link": "Security -PM-2158",
                      "status": "Done",
                      "summary": "Deprecate parameter signatureSize",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaSignCore",
                      "key": "NSC-226",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Sent to QA",
                      "summary": "Web2.0 - list quick filters endpoint",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaSignCore",
                      "key": "NSC-224",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Sent to QA",
                      "summary": "[PM-2142] Web task list advanced search",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaSignCore",
                      "key": "NSC-222",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Sent to QA",
                      "summary": "[PM-2141] Web task list main and custom filters",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaSignCore",
                      "key": "NSC-203",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Sent to QA",
                      "summary": "[PM-886] Attribute 'subject' for signature processes",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaSignCore",
                      "key": "NSC-202",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Sent to QA",
                      "summary": "[PM-267] Attribute 'from' for signature processes",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "XADES",
                      "key": "XADES-50",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Setup Prometheus monitoring (XAdES)",
                      "type": "Internal"
                  },
                  {
                      "cause": null,
                      "components": "XADES",
                      "key": "XADES-49",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Upgrade to JAVA 17 (XAdES)",
                      "type": "Internal"
                  },
                  {
                      "cause": null,
                      "components": "nebulaSIGN-API",
                      "key": "SIGNAPI-59",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Setup Prometheus monitoring (Sign API)",
                      "type": "Internal"
                  },
                  {
                      "cause": null,
                      "components": "nebulaSIGN-API",
                      "key": "SIGNAPI-58",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Upgrade to JAVA 17 (Sign API)",
                      "type": "Internal"
                  },
                  {
                      "cause": null,
                      "components": "PADES",
                      "key": "PADES-134",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Update CRYPTO + SAD  error codes management",
                      "type": "Internal"
                  }
              ],
              "Smith": [
                  {
                      "cause": null,
                      "components": "LDAPSynchronizer",
                      "key": "LDAPS-16",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "[PM-1917] Support for openLDAP for LDAP synchronization",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "LDAPSynchronizer",
                      "key": "LDAPS-13",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "[PM-1729] Push objects to nebula with the current api",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "LDAPSynchronizer",
                      "key": "LDAPS-9",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Integrate with Windows Service Control Manager",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "LDAPSynchronizer",
                      "key": "LDAPS-7",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "[PM-228] Nested group support for AD",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "Nebula Credential Provider",
                      "key": "NCP-12",
                      "notes": "",
                      "priority": "Medium",
                      "status": "QA Pending",
                      "summary": "[PM-1950] Support for Windows",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "Nebula Credential Provider",
                      "key": "NCP-5",
                      "notes": "",
                      "priority": "Medium",
                      "status": "QA Pending",
                      "summary": "[PM-1919] Retrieve periodically the configuration",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "Nebula Credential Provider",
                      "key": "NCP-4",
                      "notes": "",
                      "priority": "Medium",
                      "status": "QA Pending",
                      "summary": "[PM-209] CP Get cloud configuration",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertAgent",
                      "key": "NCA-107",
                      "notes": "",
                      "priority": "Medium",
                      "status": "QA Pending",
                      "summary": "[PM-1481] Definition/consolidation of error codes",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertAgent",
                      "key": "NCA-106",
                      "notes": "",
                      "priority": "Medium",
                      "status": "QA Pending",
                      "summary": "[PM-1481] Test selector - Certificate list",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertAgent",
                      "key": "NCA-105",
                      "notes": "",
                      "priority": "Medium",
                      "status": "QA Pending",
                      "summary": "[PM-1359] Signature Test KSP - verify",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertAgent",
                      "key": "NCA-104",
                      "notes": "",
                      "priority": "Medium",
                      "status": "QA Pending",
                      "summary": "[PM-1358] Signature Test CSP - Verify",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertAgent",
                      "key": "NCA-92",
                      "notes": "",
                      "priority": "Medium",
                      "status": "QA Pending",
                      "summary": "[PM-1214] Sign with urls",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NPSAgent",
                      "key": "NPSA-31",
                      "notes": "",
                      "priority": "Medium",
                      "status": "IN QA",
                      "summary": "Actualizar los endpoints",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "Nebula Credential Provider",
                      "key": "NCP-11",
                      "notes": "",
                      "priority": "Medium",
                      "status": "IN QA",
                      "summary": "[PM-1977] Emergency user for CP",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "Nebula Credential Provider",
                      "key": "NCP-10",
                      "notes": "",
                      "priority": "Medium",
                      "status": "IN QA",
                      "summary": "[PM-1948] Remote change password support",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "Nebula Credential Provider",
                      "key": "NCP-9",
                      "notes": "",
                      "priority": "Medium",
                      "status": "IN QA",
                      "summary": "[PM-1949] Multiple scenario support",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "Nebula Credential Provider",
                      "key": "NCP-8",
                      "notes": "",
                      "priority": "Medium",
                      "status": "IN QA",
                      "summary": "[PM-1947] Local change pass flow support",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "Nebula Credential Provider",
                      "key": "NCP-7",
                      "notes": "",
                      "priority": "Medium",
                      "status": "IN QA",
                      "summary": "[PM-1944] Strong authentication to workstations",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "Nebula Credential Provider",
                      "key": "NCP-6",
                      "notes": "",
                      "priority": "Medium",
                      "status": "IN QA",
                      "summary": "[PM-1980] Two credentials basic authentication",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "Nebula Credential Provider",
                      "key": "NCP-3",
                      "notes": "",
                      "priority": "Medium",
                      "status": "IN QA",
                      "summary": "[PM-1921] Register credential provider in cloud",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "Nebula Credential Provider",
                      "key": "NCP-2",
                      "notes": "",
                      "priority": "Medium",
                      "status": "IN QA",
                      "summary": "[PM-1920] Simple Authentication to workstation with nebulaSUITE user",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "Nebula Credential Provider",
                      "key": "NCP-1",
                      "notes": "",
                      "priority": "Medium",
                      "status": "IN QA",
                      "summary": "[PM-1918] Install and uninstall Credential Provider",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "LDAPSynchronizer",
                      "key": "LDAPS-8",
                      "notes": "",
                      "priority": "Medium",
                      "status": "QA FAILED",
                      "summary": "[PM-1724] Support for mass usage of ldap synchronization",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertAgent",
                      "key": "NCA-93",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Sent to QA",
                      "summary": "[PM-1350] Sign and retrieve NavCycle",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertAgent",
                      "key": "NCA-88",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Sent to QA",
                      "summary": "[PM-1479] Test selector - Alias",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertAgent",
                      "key": "NCA-83",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Sent to QA",
                      "summary": "Save URLs from shared memory",
                      "type": "Task"
                  }
              ],
              "Sputnik": [
                  {
                      "cause": null,
                      "components": "NebulaAccessServer",
                      "key": "NEBAS-8",
                      "notes": "",
                      "priority": "Medium",
                      "status": "To Do",
                      "summary": "[PM-1929] nebulaACCESS back internal improvements - Documentation",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "Metrics Monitoring",
                      "key": "MEMO-33",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "[PM-2120] nebulaSUITE object metrics",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaAccessServer",
                      "key": "NEBAS-50",
                      "notes": "",
                      "priority": "Medium",
                      "status": "QA Pending",
                      "summary": "[PM-1637] Frontend API Customize tenant options",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaAccessServer",
                      "key": "NEBAS-29",
                      "notes": "",
                      "priority": "Medium",
                      "status": "QA Pending",
                      "summary": "[PM-1635] Frontend API Manage the status of one token",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaAccessServer",
                      "key": "NEBAS-12",
                      "notes": "",
                      "priority": "Medium",
                      "status": "QA Pending",
                      "summary": "[PM-1977] Agent API CP Authentication",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaAccessServer",
                      "key": "NEBAS-11",
                      "notes": "",
                      "priority": "Medium",
                      "status": "QA Pending",
                      "summary": "[PM-1972] Agent API CP Registration and Configuration",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaAccessServer",
                      "key": "NEBAS-10",
                      "notes": "",
                      "priority": "Medium",
                      "status": "QA Pending",
                      "summary": "[PM-1973] Frontend API CP Agent Management",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaAccessServer",
                      "key": "NEBAS-9",
                      "notes": "",
                      "priority": "Medium",
                      "status": "QA Pending",
                      "summary": "[PM-1971] Frontend API CP Configuration management",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaAccessServer",
                      "key": "NEBAS-58",
                      "notes": "",
                      "priority": "Medium",
                      "status": "IN QA",
                      "summary": "[PM-1948] Reset user password through WSA agent",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "Metrics Monitoring",
                      "key": "MEMO-34",
                      "notes": "",
                      "priority": "Medium",
                      "status": "IN QA",
                      "summary": "Add support for audit event signature i CSC",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "Metrics Monitoring",
                      "key": "MEMO-32",
                      "notes": "",
                      "priority": "Medium",
                      "status": "IN QA",
                      "summary": "[PM-2118] nebulaSIGN object metrics",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "SDK Nebula Users",
                      "key": "SDKNU-1",
                      "notes": "",
                      "priority": "Highest",
                      "status": "Done",
                      "summary": "Create new NebulaUsers library",
                      "type": "Internal"
                  }
              ],
              "Team_Rocket": [
                  {
                      "cause": null,
                      "components": "SoftwareCertificateService ",
                      "key": "SCS-9",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "nebulaCERT licencing metrics",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertCore",
                      "key": "NCC-379",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "nebulaCERT licencing metrics",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertCore",
                      "key": "NCC-320",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Save the revocation status in database",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "Keystore",
                      "key": "KEYS-65",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "nebulaCERT licencing metrics",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "KeyManager",
                      "key": "KEYM-31",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "[PM-2135] Import and issuance storage configuration",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "Crypto Service",
                      "key": "CRYPS-66",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Audit internal signHash endpoint",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "Cerberus Service",
                      "key": "CERS-23",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "New column to add sam keys specific data",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "Crypto Service",
                      "key": "CRYPS-35",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Rejected",
                      "summary": "[PM-1869] Internal functions to generate keys in Crypto",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "Keystore",
                      "key": "KEYS-42",
                      "notes": "",
                      "priority": "Medium",
                      "status": "IN QA",
                      "summary": "Add metrics in more connectors",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "KeyManager",
                      "key": "KEYM-32",
                      "notes": "",
                      "priority": "Medium",
                      "status": "IN QA",
                      "summary": "[PM-343]  SAM support for nebulaSUITE",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "KeyManager",
                      "key": "KEYM-26",
                      "notes": "",
                      "priority": "Medium",
                      "status": "IN QA",
                      "summary": "[PM-75] Get SAM config from ConfigServer",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "KeyManager",
                      "key": "KEYM-24",
                      "notes": "",
                      "priority": "Medium",
                      "status": "IN QA",
                      "summary": "[PM-341] Use keys created using sam",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "KeyManager",
                      "key": "KEYM-23",
                      "notes": "",
                      "priority": "Medium",
                      "status": "IN QA",
                      "summary": "[PM-341] Create keys using sam",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "KeyManager",
                      "key": "KEYM-22",
                      "notes": "",
                      "priority": "Medium",
                      "status": "IN QA",
                      "summary": "[PM-341] Connect keyManager to SAM",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "KeyManager",
                      "key": "KEYM-12",
                      "notes": "",
                      "priority": "Medium",
                      "status": "IN QA",
                      "summary": "[PM-1869] Internal functions to generate keys in Keymanager",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "SADService",
                      "key": "SAD-15",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Sent to QA",
                      "summary": "Añadir métricas",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaCertCore",
                      "key": "NCC-256",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Sent to QA",
                      "summary": "[PM-336] Availability and failover on keycave",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "Keystore",
                      "key": "KEYS-34",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Sent to QA",
                      "summary": "Añadir métricas",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "KeyManager",
                      "key": "KEYM-10",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Sent to QA",
                      "summary": "Añadir métricas",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "KeyCave",
                      "key": "KEYC-58",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Sent to QA",
                      "summary": "[PM-336] Availability and failover on keycave",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "CSC-Api",
                      "key": "CSC-61",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Sent to QA",
                      "summary": "Añadir métricas",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "Crypto Service",
                      "key": "CRYPS-30",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Sent to QA",
                      "summary": "Añadir métricas",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "Cerberus Service",
                      "key": "CERS-8",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Sent to QA",
                      "summary": "Añadir métricas",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "NebulaSUITE",
                      "key": "SUITE-31",
                      "notes": "",
                      "priority": "Blocker",
                      "status": "Not a Bug",
                      "summary": "The Swaggers CSC and Auth don't work in production",
                      "type": "Task"
                  },
                  {
                      "cause": null,
                      "components": "SADService",
                      "key": "SAD-25",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Add new error codes",
                      "type": "Internal"
                  },
                  {
                      "cause": null,
                      "components": "SADService",
                      "key": "SAD-24",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Setup Prometheus monitoring (SAD)",
                      "type": "Internal"
                  },
                  {
                      "cause": null,
                      "components": "SADService",
                      "key": "SAD-23",
                      "notes": "",
                      "priority": "Medium",
                      "status": "Done",
                      "summary": "Upgrade to JAVA 17 (SAD)",
                      "type": "Internal"
                  },
                  {
                      "cause": null,
                      "components": "SADService",
                      "key": "SAD-21",
                      "notes": "",
                      "priority": "Highest",
                      "status": "Done",
                      "summary": "Configure zipkin to work with both SpringBoot 2 and 3 remote components",
                      "type": "Internal"
                  }
              ]
          },
          "story": {
              "Heyday": [
                  {
                      "components": [
                          "nebulaSIGN"
                      ],
                      "key": "PM-2105",
                      "status": "FACTORY ACCEPTANCE TEST",
                      "summary": "Web Basic task list"
                  },
                  {
                      "components": [
                          "Login"
                      ],
                      "key": "PM-1449",
                      "status": "IN FACTORY",
                      "summary": "SAML login flow"
                  },
                  {
                      "components": [
                          "Login"
                      ],
                      "key": "PM-1448",
                      "status": "IN FACTORY",
                      "summary": "Standard login flow"
                  },
                  {
                      "components": [
                          "nebulaCERT"
                      ],
                      "key": "PM-1956",
                      "status": "Waiting approval",
                      "summary": "Include Hotjar in Access website"
                  }
              ],
              "Nakama": [
                  {
                      "components": [
                          "nebulaSIGN"
                      ],
                      "key": "PM-886",
                      "status": "FACTORY ACCEPTANCE TEST",
                      "summary": "Attribute 'subject' for signature processes"
                  },
                  {
                      "components": [
                          "nebulaSIGN"
                      ],
                      "key": "PM-267",
                      "status": "FACTORY ACCEPTANCE TEST",
                      "summary": "Attribute 'from' for signature processes"
                  }
              ],
              "Smith": [
                  {
                      "components": [
                          "nebulaDiscover",
                          "nebulaSIGN"
                      ],
                      "key": "PM-2163",
                      "status": "IN FACTORY",
                      "summary": "Tool to generate a keystore with the TSL"
                  },
                  {
                      "components": [],
                      "key": "PM-2127",
                      "status": "IN FACTORY",
                      "summary": "Agent Installation procedure"
                  },
                  {
                      "components": [
                          "CredentialProvider"
                      ],
                      "key": "PM-1997",
                      "status": "QA Testing Story",
                      "summary": "Emergency user for CP"
                  },
                  {
                      "components": [
                          "CredentialProvider"
                      ],
                      "key": "PM-1980",
                      "status": "QA Testing Story",
                      "summary": "Two credentials basic authentication"
                  },
                  {
                      "components": [
                          "CredentialProvider"
                      ],
                      "key": "PM-1950",
                      "status": "QA Testing Story",
                      "summary": "Support for Windows"
                  },
                  {
                      "components": [
                          "CredentialProvider"
                      ],
                      "key": "PM-1949",
                      "status": "QA Testing Story",
                      "summary": "Multiple scenario support"
                  },
                  {
                      "components": [
                          "CredentialProvider"
                      ],
                      "key": "PM-1948",
                      "status": "QA Testing Story",
                      "summary": "Remote change password support"
                  },
                  {
                      "components": [
                          "CredentialProvider"
                      ],
                      "key": "PM-1947",
                      "status": "QA Testing Story",
                      "summary": "Local change pass flow support"
                  },
                  {
                      "components": [
                          "CredentialProvider"
                      ],
                      "key": "PM-1944",
                      "status": "QA Testing Story",
                      "summary": "Strong authentication to workstations"
                  },
                  {
                      "components": [
                          "CredentialProvider"
                      ],
                      "key": "PM-1921",
                      "status": "QA Testing Story",
                      "summary": "Register credential provider in cloud"
                  },
                  {
                      "components": [
                          "CredentialProvider"
                      ],
                      "key": "PM-1920",
                      "status": "QA Testing Story",
                      "summary": "Same Credential basic authentication"
                  },
                  {
                      "components": [
                          "CredentialProvider"
                      ],
                      "key": "PM-1919",
                      "status": "QA Testing Story",
                      "summary": "Retrieve periodically the configuration"
                  },
                  {
                      "components": [
                          "CredentialProvider"
                      ],
                      "key": "PM-1918",
                      "status": "QA Testing Story",
                      "summary": "Install and uninstall Credential Provider"
                  },
                  {
                      "components": [
                          "CredentialProvider"
                      ],
                      "key": "PM-209",
                      "status": "QA Testing Story",
                      "summary": "CP Get cloud configuration"
                  },
                  {
                      "components": [
                          "LDAP synchronizer"
                      ],
                      "key": "PM-1724",
                      "status": "Story Rejected",
                      "summary": "Support for mass usage of ldap synchronization"
                  }
              ],
              "Sputnik": [
                  {
                      "components": [
                          "MetricsSystem"
                      ],
                      "key": "PM-2118",
                      "status": "QA Testing Story",
                      "summary": "nebulaSIGN object metrics"
                  },
                  {
                      "components": [
                          "nebulaACCESS"
                      ],
                      "key": "PM-1977",
                      "status": "QA Testing Story",
                      "summary": "Agent API CP Authentication"
                  },
                  {
                      "components": [
                          "nebulaACCESS"
                      ],
                      "key": "PM-1972",
                      "status": "QA Testing Story",
                      "summary": "Agent API CP Registration and Configuration"
                  },
                  {
                      "components": [
                          "nebulaACCESS"
                      ],
                      "key": "PM-1637",
                      "status": "QA Testing Story",
                      "summary": "Frontend API Customize tenant options"
                  },
                  {
                      "components": [
                          "nebulaACCESS"
                      ],
                      "key": "PM-1635",
                      "status": "QA Testing Story",
                      "summary": "Frontend API Manage the status of one token"
                  }
              ],
              "Team_Rocket": [
                  {
                      "components": [
                          "nebulaCERT"
                      ],
                      "key": "PM-343",
                      "status": "QA Testing Story",
                      "summary": "SAM support for nebulaSUITE"
                  },
                  {
                      "components": [
                          "nebulaCERT"
                      ],
                      "key": "PM-341",
                      "status": "QA Testing Story",
                      "summary": "Connect keyManager to SAM"
                  },
                  {
                      "components": [
                          "nebulaCERT"
                      ],
                      "key": "PM-340",
                      "status": "QA Testing Story",
                      "summary": "Connect certCore with keyManager"
                  },
                  {
                      "components": [
                          "nebulaCERT"
                      ],
                      "key": "PM-75",
                      "status": "QA Testing Story",
                      "summary": "SAM configuration system"
                  },
                  {
                      "components": [
                          "nebulaCERT"
                      ],
                      "key": "PM-74",
                      "status": "QA Testing Story",
                      "summary": "Update database with SAM information"
                  },
                  {
                      "components": [
                          "keyCave"
                      ],
                      "key": "PM-336",
                      "status": "Story Rejected",
                      "summary": "Availability and failover on keycave"
                  }
              ]
          }
      },
      "sprint": "Sprint #21",
      "start_date": "03/10/2023"
  }

    
    res.json(json_response_data);

  } catch (e) {
    // Manejar errores
    console.error('Error al hacer la solicitud a la API en Python:', e);
    res.status(500).json({ error: 'Error al consultar la API en Python' });
  }
});

router.post('/generate_pdf', async (req, res) => {
  try {
    const jsonData = req.body;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename= ' + jsonData.sprint + '.pdf');
    const doc = await pdf_generator(json_response_data)
    doc.pipe(res);
  } catch (e){
    console.error("Error generating pdf:", e)
    res.status(500).json({ error: 'Error al consultar la API en Python' });
  }
})


router.post('/close', async (req, res) => {
  try{
    const doc = await pdf_generator(json_response_data, false)
    const pdfStream = new PassThrough();
    doc.pipe(pdfStream);
    const form = new FormData();
    form.append('sprint_id', req.body.sprint_id);
    form.append('comments', req.body.comments);
    form.append('key', req.body.key);
    form.append('pdf', pdfStream, { filename: json_response_data.sprint.replace(" #", "__") + '.pdf' });
    const config = {
      headers: {
        'Authorization': `Bearer ${req.session.token}`,
        ...form.getHeaders(), // Establecer los encabezados adecuados para 'multipart/form-data'
      },
    };
  
    const response = await axios.post(ApiURL + `/storic/add`, form, config);
  
    res.json(response.data);
  }catch (e){
    console.error("Error en pdf_generator:", e);
  }
})


router.post('/generate_report', async (req, res) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${req.session.token}`,
      'Content-Type': 'application/json'
    }
  };

  const data = {
    'sprint_id' : req.body.sprint_id,
    'comments' : req.body.comments,
    'key': req.body.key
  };

  var response = await axios.post(ApiURL + `/storic/add`, data, config);
  var r_data = response.data;

  res.json(r_data);
})

module.exports = router;