import mongoose, { set } from "mongoose";

const Schema = mongoose.Schema;
const dataSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        set: (v) => Math.round(v)
    },
    urea: {
        type: Number,
        default: 10,
    },
    creatinine: {
        type: Number,
        set: (v) => Math.round(v),
        default: 75,
    },
    haemoglobin: {
        type: Number,
        default: 9,
    },
    cholesterol: {
        type: Number,
        default: 4.2,
    },
    triglycerides: {
        type: Number,
        default: 0.8,
    },
    hdl: {
        type: Number,
        default: 1.3,
    },
    ldl: {
        type: Number,
        default: 2,
    },
    vldl: {
        type: Number,
        default: 0.4,
    },
    bmi: {
        type: Number,
        default: 20,
    },
    currentSmoker: {
        type: Boolean,
        default: false,
    },
    cigsPerDay: {
        type: Number,
        default: 0,
    },
    BPMeds: {
        type: Boolean,
        default: false,
    },
    prevalentStroke: {
        type: Boolean,
        default: false,
    },
    prevalentHyp: {
        type: Boolean,
        default: false,
    },
    diabetes: {
        type: Boolean,
        default: false,
    },
    totChol: {
        type: Number,
        default: 200,
    },
    sysBP: {
        type: Number,
        default: 120,
    },
    diaBP: {
        type: Number,
        default: 80,
    },
    heartRate: {
        type: Number,
        default: 70,
    },
    glucose: {
        type: Number,
        default: 80,
    },
    MDVPJitterPercent: {
        type: Number,
        default: 0.004,
    },
    MDVPJitterAbs: {
        type: Number,
        default: 0.00003,
    },
    MDVPShimmerPercent: {
        type: Number,
        default: 0.03,
    },
    MDVPShimmerDb: {
        type: Number,
        default: 0.3,
    },
    MDVPRap: {
        type: Number,
        default: 0.003,
    },
    MDVPPpq: {
        type: Number,
        default: 0.002,
    },
    JitterDDP: {
        type: Number,
        default: 0.009,
    },
    ShimmerAPQ3: {
        type: Number,
        default: 0.02,
    },
    ShimmerAPQ5: {
        type: Number,
        default: 0.03,
    },
    MDVPAPQ: {
        type: Number,
        default: 0.03,
    },
    ShimmerDDA: {
        type: Number,
        default: 0.03,
    },
    NHR: {
        type: Number,
        default: 0.02,
    },
    RPDE: {
        type: Number,
        default: 0.5,
    },
    DFA: {
        type: Number,
        default: 0.5,
    },
    spread1: {
        type: Number,
        default: -5,
    },
    D2: {
        type: Number,
        default: 2,
    },
    PPE: {
        type: Number,
        default: 0.2,
    }
}, { timestamps: true });

const Data = mongoose.model("Data", dataSchema);
export default Data;