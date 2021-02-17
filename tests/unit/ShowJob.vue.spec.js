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
  // Show the current values

  it("renders job.title when passed", () => {
    expect(wrapper.text()).toMatch(job.title);
  });

  it("renders job.description when passed", () => {
    expect(wrapper.text()).toMatch(job.description);
  });

  //it("renders a list of skills when passed", () => {
  //  expect(wrapper.).toMatch(job.skills);
  //})

  // Allow toggle between editing (use EditJob) and show
  /*it("emits 'job-updated' when btn-edit-job clicked", () => {
    const btnEditJob = wrapper.find('#btn-edit-job');
    btnEditJob.trigger('click');
    expect(wrapper.emitted('job-updated')).toBeTruthy();
  });
  */

  // On save, emit 'job-updated' and switch back to view

  // 'delete' button if object is persisted (emit 'job-deleted')

  it("emits 'job-deleted' when btn-delete-job clicked", () => {
    const btnDeleteJob = wrapper.find("#btn-delete-job");
    btnDeleteJob.trigger("click");
    expect(wrapper.emitted("job-deleted")).toBeTruthy();
  });
});
