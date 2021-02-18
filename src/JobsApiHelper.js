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
    this.api = new JobsAPI;
    this.mock = true;
  }

  get(id) {
    const jobs = this.api.get();
    if (this.mock) {
      if (id) {
        // Return specific job by ID; if ID not found, return empty set.
        return this.jobs.find(job => job.id === id) ?? { jobs: {} };
      } else {
        // If called without arguments, return entire set.
        return this.jobs;
      }
    } else {
      return jobs;
    }
  }

  post(job) {
    const response = this.api.post(job);
    if (this.mock) {
      // Create a new unique id and assign it to the new job
      job.id = Date.now();
      // Add newJob to jobs
      this.jobs.push(job);
      // Mock response
      return { job: this.job };
    } else {
      return response;
    }
  }

  patch(job) {
    this.jobs.splice(
      this.jobs.findIndex(item => item.id === job.id),
      1,
      job
    );
    return {};
  }

  delete(id) {
    this.jobs.splice(
      this.jobs.findIndex(item => item.id === id),
      1
    );
    return {};
  }
}


class JobsAPI {
  constructor() {
    this.host = "https://localhost:8080";
    this.path = "jobs";
    this.someApiKey = "ExampleRandomString"; // Really should be read in from environment or secret instead of hard-coded in source.
    this.endpoint = new URL(this.path, this.host);
    this.mock = new JobsApiWrapper;
  }

  // TODO: Change to private method when https://github.com/tc39/proposal-private-methods is approved.
  checkErrors = function(response, mock) {
    if (response) {
      if (response.status >= 200 && response.status <= 299) {
        return response;
      } else {
        throw Error(response.statusText);
      }
    } else {
      if (mock) {
        return mock.call(this);
      } else {
        throw Error(NetworkError);
      }
    }
  }
  /* ---- End private ---- */

  get = function(id) {

    let mock = undefined;

    if (this.mock) {
      mock = this.mock.get();
    }

    let params = {
      apiKey: this.someApiKey
    };

    if (id) {
      params.id = id;
    }

    const url = this.endpoint;
    url.search = new URLSearchParams(params);

    let job;

    fetch(url, {
      method: 'GET'
    })
      .then(this.checkErrors(mock))
      .then(response => response.json())
      .then(data => job = data.job)
      .catch(error => console.log(error));

    return job;
  }
}
