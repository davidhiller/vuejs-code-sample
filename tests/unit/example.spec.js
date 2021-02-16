import { shallowMount } from "@vue/test-utils";
import ShowJob from "@/components/ShowJob.vue";

describe("ShowJob.vue", () => {
  const job = {
    title: "Job Title",
    description: "Job Description"
  };
  it("renders job.title when passed", () => {
    const wrapper = shallowMount(ShowJob, {
      propsData: { job }
    });
    expect(wrapper.text()).toMatch(job.title);
  });
  it("renders job.description when passed", () => {
    const wrapper = shallowMount(ShowJob, {
      propsData: { job }
    });
    expect(wrapper.text()).toMatch(job.description);
  });
});
