import { JobClient, TechnologyClient, TrainingClient } from './resumeApi';

export default class CachedClient {
    static displayName = CachedClient.name;
    static jobsCacheKey = "jobs";
    static technologiesCacheKey = "technologies";
    static trainingsCacheKey = "trainings";

    getJobs() {
        const client = new JobClient();
        var requestPromise = CachedClient.cacheRequest(client, (c) => c.getAll(), CachedClient.jobsCacheKey);
        return requestPromise;
    }

    getJob(id) {
        const client = new JobClient();
        var requestPromise = client.get(id);
        return requestPromise;
    }

    saveJob(job) {
        const client = new JobClient();
        if (job.id === 0)
            return CachedClient.clearCacheRequest(client, (c) => c.post(job), CachedClient.jobsCacheKey);
        else
            return CachedClient.clearCacheRequest(client, (c) => c.put(job.id, job), CachedClient.jobsCacheKey);
    }

    deleteJob(jobId) {
        const client = new JobClient();
        var requestPromise = CachedClient.clearCacheRequest(client, (c) => c.delete(jobId), CachedClient.jobsCacheKey);
        return requestPromise;
    }

    getTechnologies() {
        const client = new TechnologyClient();
        var requestPromise = CachedClient.cacheRequest(client, (c) => c.get(), CachedClient.technologiesCacheKey);
        return requestPromise;
    }

    getTrainings() {
        const client = new TrainingClient();
        var requestPromise = CachedClient.cacheRequest(client, (c) => c.getAll(), CachedClient.trainingsCacheKey);
        return requestPromise;
    }

    getTraining(id) {
        const client = new TrainingClient();
        var requestPromise = client.get(id);
        return requestPromise;
    }

    saveTraining(training) {
        const client = new TrainingClient();
        if (training.id === 0)
            return CachedClient.clearCacheRequest(client, (c) => c.post(training), CachedClient.trainingsCacheKey);
        else
            return CachedClient.clearCacheRequest(client, (c) => c.put(training.id, training), CachedClient.trainingsCacheKey);
    }

    deleteTraining(trainingId) {
        const client = new TrainingClient();
        var requestPromise = CachedClient.clearCacheRequest(client, (c) => c.delete(trainingId), CachedClient.trainingsCacheKey);
        return requestPromise;
    }


    static clearCacheRequest = (client, callback, cacheKey) => {
        return new Promise((resolve, reject) => {
                callback(client)
                    .then(res => res)
                    .then(
                        (result) => {
                            sessionStorage.removeItem(cacheKey);
                            resolve(result);
                        },
                        (error) => {
                            reject(error);
                        }
                    )
                    .catch(error => {
                        reject(error);
                    });
        });
    }

    static cacheRequest = (client, callback, cacheKey) => {
        return new Promise((resolve, reject) => {
            const cache = sessionStorage.getItem(cacheKey);
            if (cache) {
                resolve(JSON.parse(cache));
            }
            else {
                callback(client)
                    .then(res => res)
                    .then(
                        (result) => {
                            sessionStorage.setItem(cacheKey, JSON.stringify(result));
                            resolve(result);
                        },
                        (error) => {
                            reject(error);
                        }
                    )
                    .catch(error => {
                        reject(error);
                    });
            }
        });
    }

}
