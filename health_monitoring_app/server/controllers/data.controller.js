import Data from "../models/data.model.js"
import User from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const uploadPatientData = asyncHandler( async (req, res) => {
    const {
        age,
        urea,
        creatinine,
        haemoglobin,
        cholesterol,
        triglycerides,
        hdl,
        ldl,
        vldl,
        bmi,
        currentSmoker,
        cigsPerDay,
        BPMeds,
        prevalentStroke,
        prevalentHyp,
        diabetes,
        totChol,
        sysBP,
        diaBP,
        heartRate,
        glucose,
        MDVPJitterPercent,
        MDVPJitterAbs,
        MDVPShimmerPercent,
        MDVPShimmerDB,
        MDVPRap,
        MDVPPPQ,
        JitterDDP,
        ShimmerAPQ3,
        ShimmerAPQ5,
        MDVPAPQ,
        ShimmerDDA,
        NHR,
        RPDE,
        DFA,
        spread1,
        D2,
        PPE
    } = req.body;

    const userId = req.user._id;

    try {
        const data = await Data.create({
            userId,
            age,
            urea,
            creatinine,
            haemoglobin,
            cholesterol,
            triglycerides,
            hdl,
            ldl,
            vldl,
            bmi,
            currentSmoker,
            cigsPerDay,
            BPMeds,
            prevalentStroke,
            prevalentHyp,
            diabetes,
            totChol,
            sysBP,
            diaBP,
            heartRate,
            glucose,
            MDVPJitterPercent,
            MDVPJitterAbs,
            MDVPShimmerPercent,
            MDVPShimmerDB,
            MDVPRap,
            MDVPPPQ,
            JitterDDP,
            ShimmerAPQ3,
            ShimmerAPQ5,
            MDVPAPQ,
            ShimmerDDA,
            NHR,
            RPDE,
            DFA,
            spread1,
            D2,
            PPE
        });
        return res.status(201).json(
            new ApiResponse(200, data, "Patient data uploaded successfully")
        )
    } catch (error) {
        throw new ApiError(500, "Something went wrong while uploading the patient data")
    }
})

const getDiabetesData = asyncHandler( async (req, res) => {
    const userId = req.user._id;

    try {
        const data = await Data.find({ userId });
        const diabetesData = data.map(({...item}) => {
            return {
                age,
                urea,
                creatinine,
                haemoglobin,
                cholesterol,
                triglycerides,
                hdl,
                ldl,
                vldl,
                bmi
            }
        })
        return res.status(200).json(
            new ApiResponse(200, data, "Patient data fetched successfully")
        )
    } catch (error) {
        throw new ApiError(500, "Something went wrong while fetching the patient data")
    }
});

export {
    uploadPatientData,
    getDiabetesData
}