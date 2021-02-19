import { shallowMount } from "@vue/test-utils";
import ShowJob from "@/components/ShowJob.vue";

const job = {
  title: "Job Title",
  description: "Job Description",
  skills: ["skill lowercase 1", "skill Uppercase 2", "skill CAPS 3"]
};

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(ShowJob, {
    propsData: { job }
  });
  expect(wrapper.exists()).toBeTruthy();
});

afterEach(() => {
  wrapper.destroy();
});

describe("ShowJob.vue", () => {
  describe("rendered elements", () => {
    // Show the current values
    it("renders job.title when passed", () => {
      expect(wrapper.text()).toMatch(job.title);
    });

    it("renders job.description when passed", () => {
      expect(wrapper.text()).toMatch(job.description);
    });

    it("renders a list of skills when passed job.skills", () => {
      let displayedSkills = [];
      expect(wrapper.findAll(".skill").length).toBe(job.skills.length);
      wrapper
        .findAll(".skill")
        .wrappers.forEach(item => displayedSkills.push(item.text()));
      expect(displayedSkills).toEqual(job.skills);
    });
  });

  describe("emits", () => {
    // Allow toggle between editing (use EditJob) and show
    /*it("emits 'job-updated' when btn-edit-job clicked", () => {
      const btnEditJob = wrapper.find('#btn-edit-job');
      btnEditJob.trigger('click');
      expect(wrapper.emitted('job-updated')).toBeTruthy();
    });
    */

    // On save, emit 'job-updated' and switch back to view
    //it("emits 'job-updated' when EditJob emits 'job-saved'", () => {});

    // 'delete' button if object is persisted (emit 'job-deleted')
    it("emits 'job-deleted' when btn-delete-job clicked", async () => {
      const btnDeleteJob = wrapper.findComponent({ref: "btn-delete-job"});
      await btnDeleteJob.trigger("click");
      expect(wrapper.emitted("job-deleted")).toBeTruthy();
    });
  });
});
