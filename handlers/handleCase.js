import exp from 'constants';
import Case from '../models/case.js';

export function createCase(doctorId,patientId,title,description,firstImageURL){
    const newCase = new Case({
        doctorId: doctorId,
        patientId: patientId,
        title: title,
        description: description,
        firstImageURL: firstImageURL
    });

    newCase.save()
        .then(savedCase=> console.log("Case saved:",savedCase))
        .catch(err=> console.log("Error while saving case",err));
}

export async function modifyCase(caseId,updates){
    try{
        const updatedCase = await Case.findOneAndUpdate({ case : caseId },updates,{new:true})
        if(updatedCase){
            console.log("Case updated ",updatedCase);
            return true;
        }
        else{
            console.log("No such case found",caseId);
            return false;
        }
    }
    catch(err){
        console.log("Error occured while modifying case",err)
    }
}

export async function deleteCase(caseId){
    try{
        const result = await Case.findOneAndDelete({ "caseId" : caseId })
        if(result){
            console.log("Case deleted ",caseId)
            return true;
        }
        else{
            console.log("No such case found");
            return false;
        }
    }
    catch(err){
        console.log("Error occured while deleting case",err);
    }
    
}

export async function fetchCase(caseId) {
    try{
        const result = await Case.findOne({"caseId": caseId})
        if(result){
            console.log("Case fetched",result)
            return result;
        }
        else{
            console.log("No such case found");
            return false;
        }
    }
    catch(err){
        console.log("Error occured while fetching case",err);
    }
}

export async function fetchAllCases(){
    try{
        const result = await Case.find()
        if(result){
            console.log("Cases fetched",result)
            return result;
        }
        else{
            console.log("No cases found");
            return false;
        }
    }
    catch(err){
        console.log("Error occured while fetching cases",err);
    }
}