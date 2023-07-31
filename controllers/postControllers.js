
import { db } from "../db.js";

// ***********************************addUserInfo*******************************
export const addUserInfo = (req, res) => {
  const q = `
    INSERT INTO userinformation (
        uid1,
        fullName,
        bio,
        profilePicture,
        jobTitle,
        workExperience,
        education,
        skills,
        resume,
        portfolioLink,
        jobPreferences,
        availability,
        linkedInProfile,
        additionalInfo,
        reference1,
        workAuthorization,
        salaryExpectations,
        preferredCommunication
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
        uid1 = VALUES(uid1),
        fullName = IF(VALUES(fullName) <> '', VALUES(fullName), fullName),
        bio = IF(VALUES(bio) <> '', VALUES(bio), bio),
        profilePicture = IF(VALUES(profilePicture) <> '', VALUES(profilePicture), profilePicture),
        jobTitle = IF(VALUES(jobTitle) <> '', VALUES(jobTitle), jobTitle),
        workExperience = IF(VALUES(workExperience) <> '', VALUES(workExperience), workExperience),
        education = IF(VALUES(education) <> '', VALUES(education), education),
        skills = IF(VALUES(skills) <> '', VALUES(skills), skills),
        resume = IF(VALUES(resume) <> '', VALUES(resume), resume),
        portfolioLink = IF(VALUES(portfolioLink) <> '', VALUES(portfolioLink), portfolioLink),
        jobPreferences = IF(VALUES(jobPreferences) <> '', VALUES(jobPreferences), jobPreferences),
        availability = IF(VALUES(availability) <> '', VALUES(availability), availability),
        linkedInProfile = IF(VALUES(linkedInProfile) <> '', VALUES(linkedInProfile), linkedInProfile),
        additionalInfo = IF(VALUES(additionalInfo) <> '', VALUES(additionalInfo), additionalInfo),
        reference1 = IF(VALUES(reference1) <> '', VALUES(reference1), reference1),
        workAuthorization = IF(VALUES(workAuthorization) <> '', VALUES(workAuthorization), workAuthorization),
        salaryExpectations = IF(VALUES(salaryExpectations) <> '', VALUES(salaryExpectations), salaryExpectations),
        preferredCommunication = IF(VALUES(preferredCommunication) <> '', VALUES(preferredCommunication), preferredCommunication)
  `;

  const values = [
    req.body.uid1,
    req.body.fullName || "",
    req.body.bio || "",
    req.body.profilePicture || "",
    req.body.jobTitle || "",
    req.body.workExperience || "",
    req.body.education || "",
    req.body.skills || "",
    req.body.resume || "",
    req.body.portfolioLink || "",
    req.body.jobPreferences || "",
    req.body.availability || "",
    req.body.linkedInProfile || "",
    req.body.additionalInfo || "",
    req.body.references || "",
    req.body.workAuthorization || "",
    req.body.salaryExpectations || "",
    req.body.preferredCommunication || "",
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json("Something went wrong");
    }
    return res.status(200).json("user info has been created/updated successfully");
  });
};


// ***********************addJob controllers*****************
export const addJob = (req, res) => {
    const q = `
    INSERT INTO jobs (
        uid,
        companyName,
        companyWebsite,
        jobLink,
        jobTitle,
        jobDescription,
        qualification,
        experianceLevel,
        employmentType,
        salary,
        contactPerson,
        contactEmail,
        contactPhoneNumber,
        applicationDeadline,
        interviewSchedule,
        expectedStartDate,
        companyCulture,
        benifitAndPerks,
        oppertunityForGrowth
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;
    
    const values = [
        req.body.uid,
        req.body.companyName || "",
        req.body.companyWebsite || "",
        req.body.jobLink || "",
        req.body.jobTitle || "",
        req.body.jobDescription || "",
        req.body.qualification || "",
        req.body.experianceLevel || "",
        req.body.employmentType || "",
        req.body.salary || "",
        req.body.contactPerson || "",
        req.body.contactEmail || "",
        req.body.contactPhoneNumber || "",
        req.body.applicationDeadline || "",
        req.body.interviewSchedule || "",
        req.body.expectedStartDate || "",
        req.body.companyCulture || "",
        req.body.benifitAndPerks || "",
        req.body.oppertunityForGrowth || "",
      ];
    db.query(q,values,(err,data)=>{
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json("Something went wrong");
          }
        return res.status(200).json("Job has been created succesfuly")
    })
    
}


// *********************************getJobs*************************************
export const getJobs=(req,res)=>{
  
    const q="Select * from b3d9enuouusllaxaibu0.jobs"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
}
// **********************************getUserInfo**************************************

export const getUserInfo = (req, res) => {
  const uid = req.params.uid;

  const q = `SELECT * FROM b3d9enuouusllaxaibu0.userinformation WHERE uid1 = ?`;

  db.query(q, [uid], (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch user information.' });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.json(data[0]);
  });
};
// *******************************deleteJob*****************************************
export const deleteJob=(req,res)=>{
  const jobId=req.params.id
  const q="DELETE FROM jobs where id= ?"
  db.query(q,[jobId],(err,data)=>{
      if(err) return res.json(err)
      return res.json("Book has been deleted succesfuly")
  })
}
// ***************************************editJob***************************************
export const editJob = (req, res) => {
  const jobid = req.params.id;
  const q = `
    UPDATE jobs
    SET
        uid = ?,
        companyName = ?,
        companyWebsite = ?,
        jobLink = ?,
        jobTitle = ?,
        jobDescription = ?,
        qualification = ?,
        experianceLevel = ?,
        employmentType = ?,
        salary = ?,
        contactPerson = ?,
        contactEmail = ?,
        contactPhoneNumber = ?,
        applicationDeadline = ?,
        interviewSchedule = ?,
        expectedStartDate = ?,
        companyCulture = ?,
        benifitAndPerks = ?,
        oppertunityForGrowth = ?
    WHERE id = ?;`;
  
  const values = [
    req.body.uid,
    req.body.companyName || "",
    req.body.companyWebsite || "",
    req.body.jobLink || "",
    req.body.jobTitle || "",
    req.body.jobDescription || "",
    req.body.qualification || "",
    req.body.experianceLevel || "",
    req.body.employmentType || "",
    req.body.salary || "",
    req.body.contactPerson || "",
    req.body.contactEmail || "",
    req.body.contactPhoneNumber || "",
    req.body.applicationDeadline || "",
    req.body.interviewSchedule || "",
    req.body.expectedStartDate || "",
    req.body.companyCulture || "",
    req.body.benifitAndPerks || "",
    req.body.oppertunityForGrowth || "",
    jobid // The last value should be the jobid for the WHERE clause
  ];
  
  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Job has been updated successfully");
  });
};
