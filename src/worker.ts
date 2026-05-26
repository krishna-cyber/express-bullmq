import { Worker } from "bullmq";

const sampleWorker = new Worker("sample_queue",async(job)=>{
    try {
        console.log(`Processing job with id ${job.id} and data:`, job.data)
    } catch (error) {
        console.log(`Error processing job with id ${job.id}:`, error)
    }
}).on("completed",(job,result)=>{
    console.log(`Job with id ${job.id} completed with result: ${result}`)
})