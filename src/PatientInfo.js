import React, {useState, useEffect} from 'react';
import axios from "axios"

function PatientInfo() {
    const [data, setData] = useState({
      "contactInformation": {
          "address": "",
          "city": "",
          "state": "",
          "zipCode": "",
          "phoneNumber": "",
          "email": ""
      },
      "medicalHistory": {
          "allergies": [
          ],
          "chronicConditions": [
          ],
          "surgicalHistory": [
          ],
          "familyMedicalHistory": [
          ]
      },
      "insuranceInformation": {
          "insuranceProvider": "",
          "policyNumber": ""
      },
      "_id": "",
      "patientID": "",
      "patientName": "",
      "dateOfBirth": "",
      "gender": "",
      "medications": [
          
      ],
      "immunizations": [
          
      ],
      "labResults": [
          
      ],
      "procedures": [
      ],
      "encounters": [
      ],
      "billingInformation": [
      ],
      "__v": 0
  })

  useEffect(()=> {
    async function fetchData() {
      const d = await axios.get("http://localhost:5000/2")
      setData(d.data);
    }
    fetchData();
  }, [])

    const dateOfBirth = new Date(data.dateOfBirth).toLocaleDateString();
    const medicationsList = data.medications.map((medication, index) => (
      <div key={index}>
        <strong>Medication Name:</strong> {medication.name}<br />
        <strong>Dosage:</strong> {medication.dosage}<br />
        <strong>Frequency:</strong> {medication.frequency}
      </div>
    ));

    const labResultsList = data.labResults.map((labResult, index) => (
      <div key={index}>
        <strong>Test:</strong> {labResult.test}<br />
        <strong>Result:</strong> {labResult.result}<br />
        <strong>Date of Test:</strong> {new Date(labResult.date).toLocaleDateString()}
      </div>
    ));

    const proceduresList = data.procedures.map((procedure, index) => (
      <div key={index}>
        {procedure}
      </div>
    ));

    const encountersList = data.encounters.map((encounter, index) => (
      <div key={index}>
        <strong>Date of Encounter:</strong> {new Date(encounter.date).toLocaleDateString()}<br />
        <strong>Encounter Notes:</strong> {encounter.notes}
      </div>
    ));

    const billingInfoList = data.billingInformation.map((billingInfo, index) => (
      <div key={index}>
        <strong>Invoice Number:</strong> {billingInfo.invoiceNumber}<br />
        <strong>Service Date:</strong> {new Date(billingInfo.serviceDate).toLocaleDateString()}<br />
        <strong>Total Amount:</strong> {billingInfo.totalAmount}<br />
        <strong>Payment Status:</strong> {billingInfo.paymentStatus}
      </div>
    ));

    return (
      <div className="patient-info">
        <h1>Patient Information</h1>
        <div>
          <strong>Patient Name:</strong> {data.patientName}
        </div>
        <div>
          <strong>Date of Birth:</strong> {dateOfBirth}
        </div>
        <div>
          <strong>Gender:</strong> {data.gender}
        </div>
        <div>
          <strong>Contact Information:</strong>
          <div>
            <strong>Address:</strong> {data.contactInformation.address}
          </div>
          <div>
            <strong>City:</strong> {data.contactInformation.city}
          </div>
          <div>
            <strong>State:</strong> {data.contactInformation.state}
          </div>
          <div>
            <strong>Zip Code:</strong> {data.contactInformation.zipCode}
          </div>
          <div>
            <strong>Phone Number:</strong> {data.contactInformation.phoneNumber}
          </div>
          <div>
            <strong>Email:</strong> {data.contactInformation.email}
          </div>
        </div>
        <div>
          <strong>Medical History:</strong>
          <div>
            <strong>Allergies:</strong> {data.medicalHistory.allergies.join(', ')}
          </div>
          <div>
            <strong>Chronic Conditions:</strong> {data.medicalHistory.chronicConditions.join(', ')}
          </div>
          <div>
            <strong>Surgical History:</strong> {data.medicalHistory.surgicalHistory.join(', ')}
          </div>
          <div>
            <strong>Family Medical History:</strong> {data.medicalHistory.familyMedicalHistory.join(', ')}
          </div>
        </div>
        <div>
          <strong>Medications:</strong>
          {medicationsList}
        </div>
        <div>
          <strong>Immunizations:</strong> (None recorded in the provided data)
        </div>
        <div>
          <strong>Lab Results:</strong>
          {labResultsList}
        </div>
        <div>
          <strong>Procedures:</strong>
          {proceduresList}
        </div>
        <div>
          <strong>Encounters:</strong>
          {encountersList}
        </div>
        <div>
          <strong>Insurance Information:</strong>
          <div>
            <strong>Insurance Provider:</strong> {data.insuranceInformation.insuranceProvider}
          </div>
          <div>
            <strong>Policy Number:</strong> {data.insuranceInformation.policyNumber}
          </div>
        </div>
        <div>
          <strong>Billing Information:</strong>
          {billingInfoList}
        </div>
      </div>
    );
  }

export default PatientInfo;