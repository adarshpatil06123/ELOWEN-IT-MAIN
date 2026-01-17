import React, { createContext, useState, useContext } from 'react';
import { jobsAPI } from '../services/api';

const JobsContext = createContext();

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error('useJobs must be used within JobsProvider');
  }
  return context;
};

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Fetch jobs from backend (currently uses mock data)
  const fetchJobs = async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await jobsAPI.getJobs(filters);
      setJobs(data.jobs || []);
    } catch (err) {
      setError(err.error || err.message || 'Failed to fetch jobs');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // Apply to job
  const applyToJob = async (jobId) => {
    try {
      setLoading(true);
      const result = await jobsAPI.applyToJob(jobId);
      
      if (result.success) {
        // Update local state - mark job as applied
        setJobs(jobs.map(job => 
          job.id === jobId ? { ...job, applied: true } : job
        ));
        
        // Add to applied jobs list
        const appliedJob = jobs.find(job => job.id === jobId);
        if (appliedJob && !appliedJobs.find(j => j.id === jobId)) {
          setAppliedJobs([...appliedJobs, { ...appliedJob, applied: true }]);
        }
        
        return { success: true, message: result.message || 'Applied successfully' };
      } else {
        return { success: false, error: result.error || 'Failed to apply' };
      }
    } catch (err) {
      return { 
        success: false, 
        error: err.error || err.message || 'Failed to apply to job' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Search jobs
  const searchJobs = async (query, category) => {
    try {
      setLoading(true);
      setError(null);
      const data = await jobsAPI.searchJobs(query, category);
      setJobs(data.jobs || []);
    } catch (err) {
      setError(err.error || err.message || 'Search failed');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // Get applied jobs
  const fetchAppliedJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await jobsAPI.getAppliedJobs();
      setAppliedJobs(data.jobs || []);
    } catch (err) {
      setError(err.error || err.message || 'Failed to fetch applied jobs');
      setAppliedJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // Get job by ID
  const getJobById = async (jobId) => {
    try {
      setLoading(true);
      const data = await jobsAPI.getJobById(jobId);
      return { success: true, job: data.job };
    } catch (err) {
      return { 
        success: false, 
        error: err.error || err.message || 'Job not found' 
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <JobsContext.Provider
      value={{
        jobs,
        loading,
        error,
        appliedJobs,
        fetchJobs,
        applyToJob,
        searchJobs,
        fetchAppliedJobs,
        getJobById,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
};

