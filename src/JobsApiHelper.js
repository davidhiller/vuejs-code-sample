"use strict";

// Stubs API interactions and returns cached values.
export default class JobsApiWrapper {
  constructor(jobs) {
    const staticJobs = [
      {
        id: 11,
        title: "Lead Worker - Sous Chef",
        description:
          "Key players will take ownership of their propositions by virtually facilitating actionable stakeholders. So we can hit the ground running, we will be iteratively strategizing every milestone in our space. Our business incentivizes standpoints to strategically and intelligently align our next-generation step-change. Our organic growth development lifecycle enables best-of-breed, seamless verticals.",
        skills: ["Boiling", "Mashing", "Sticking In Stew"]
      },
      {
        id: 21,
        title: "Job B",
        description:
          "You need to proactively monetize your platforms to increase your prince2 practitioner velocity. Our synergy development lifecycle enables unparalleled, senior visibilities. We thrive because of our corporate enterprise and knowledge transfer stand-up culture. Our business relays innovations to reliably and conservatively calibrate our long-term industry leader.",
        skills: ["Platform Architectures", "CI/CD"]
      },
      {
        id: 30,
        title: "Job C",
        description:
          "In the future, will you be able to globally deep-dive team players in your business? In the future, will you be able to effectively synergise market foci in your business? It's critical that we give 110% when proactively integrating enterprises. Key players will take ownership of their paradigm shifts by intelligently reusing innovative executive searches.",
        skills: ["ETL Pipelines", "Tableau", "R"]
      },
      {
        id: 47,
        title: "Job D",
        description:
          "Proactively transforming iteratively knowledge transfer user experiences is crucial to our long-term core asset. It's critical that we give 110% when ethically growing core competencies. Value-added industry leaders are becoming world-class silo experts. Key players will take ownership of their alignments by dynamically leveraging proactive stand-ups.",
        skills: ["Microservices", "Skill", "Java", "Kafka", "Antelope", ".NET"]
      },
      {
        id: 53,
        title: "Job E",
        description:
          "We aim to conservatively revolutionize our step-change by reliably virtualising our best-of-breed innovative emerging markets. Change the way you do business - adopt immersive brands. Company-wide propositions are becoming actionable milestone experts. In the future, will you be able to intelligently impact stacks in your business?",
        skills: ["CI/CD", "Jira", "Jenkins", "Kanban", "Boiling"]
      },
      {
        id: 60,
        title: "Job F",
        description:
          "Our business relays clouds to dynamically and conservatively incentivize our wholesale stakeholder. Key players will take ownership of their market foci by intelligently strategizing end-to-end synergies. We use our senior paradigm shifts to effectively manage our organic growth expectations. Is your standpoint prepared for unparalleled enterprise growth?",
        skills: ["Java", "Integration Architectures"]
      }
    ];

    this.jobs = jobs || staticJobs;
  }

  get(id) {
    if (id) {
      // Return specific job by ID; if ID not found, return empty set.
      return this.jobs.find(job => job.id == id) ?? { jobs: {} };
    } else {
      // If called without arguments, return entire set.
      return this.jobs;
    }
  }

  post(job) {
    // Create a new unique id and assign it to the new job
    job.id = Date.now();
    // Add newJob to jobs
    this.jobs.push(job);
  }

  patch(job) {
    this.jobs.splice(
      this.jobs.find(item => item.id == job.id),
      1,
      job
    );
    return {};
  }

  delete(id) {
    this.jobs.splice(
      this.jobs.find(item => item.id == id),
      1
    );
    return {};
  }
}
