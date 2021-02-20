import { shallowMount, mount } from "@vue/test-utils";
import ShowJob from "@/components/ShowJob.vue";
import EditJob from "@/components/EditJob.vue";
import Vue from 'vue';
//import Vue from 'vue';

const job = {
  title: "Job Title",
  description: "Job Description",
  skills: ["skill lowercase 1", "skill Uppercase 2", "skill CAPS 3"]
};

describe("ShowJob.vue", () => {
  describe("Rendered Elements:", () => {
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

    it("renders btn-edit-job", () => {
      expect(wrapper.findComponent({ ref: 'btn-edit-job' }).exists()).toBeTruthy();
    });

    it("renders btn-delete-job", () => {
      expect(wrapper.findComponent({ ref: 'btn-delete-job' }).exists()).toBeTruthy();
    });
  });

  // Allow toggle between editing (use EditJob) and show
  describe("Toggle Behavior:", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(ShowJob, {
        propsData: { job },
        components: { EditJob }
      });
      expect(wrapper.exists()).toBeTruthy();
    });

    afterEach(() => {
      wrapper.destroy();
    });

    describe("EditJob panel", () => {
      it("is hidden by default", () => {
        expect(wrapper.findComponent(EditJob).exists()).toBe(false);
      });
    });

    describe("button: btn-edit-job", () => {
      it("toggles to EditJob when btn-edit-job clicked", async () => {
        // EditJob should be hidden by default.
        expect(wrapper.findComponent(EditJob).exists()).toBe(false);
        const btnEditJob = wrapper.findComponent({ ref: 'btn-edit-job' });
        // Execute the toggle
        btnEditJob.trigger('click');
        await wrapper.vm.$nextTick(); // Wait for the DOM to update.
        // EditJob should now be visible with ShowJob hidden.
        expect(wrapper.findComponent(EditJob).exists()).toBe(true);
        // Conduct a fresh search for the button to ensure it disappeared.
        expect(wrapper.findComponent({ ref: 'btn-edit-job' }).exists()).toBe(false);
      });
    });
  });

  describe("Emits:", () => {
    describe("job-deleted", () => {
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

      // 'delete' button if object is persisted (emit 'job-deleted')
      it("emits 'job-deleted' when btn-delete-job clicked", async () => {
        const btnDeleteJob = wrapper.findComponent({ ref: "btn-delete-job" });
        await btnDeleteJob.trigger("click");
        expect(wrapper.emitted("job-deleted")).toBeTruthy();
      });
    });

    describe("Method: editJob()", () => {
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

      it("Handles 'job-saved' event by emitting 'job-updated'", () => {
        wrapper.vm.updateJob();
        expect(wrapper.emitted("job-updated")).toBeTruthy();
      });
    });

    describe("job-saved", () => {
      let wrapper;

      beforeEach(() => {
        wrapper = mount(ShowJob, {
            propsData: { job },
            components: { EditJob }
          });
        expect(wrapper.exists()).toBeTruthy();
      });

      afterEach(() => {
        wrapper.destroy();
      });

      // On save, emit 'job-updated'
      it("emits 'job-updated' upon handling 'job-saved' event", async () => {
        // First, switch to edit mode so that the EditJob component is rendered:
        wrapper.findComponent({ ref: "btn-edit-job" }).trigger('click');
        await wrapper.vm.$nextTick(); // Wait for the DOM to update.

        // Next, trigger 'job-saved' event in child component.
        await wrapper.findComponent(EditJob).vm.$emit('job-saved', job);

        expect(wrapper.emitted("job-updated")).toBeTruthy();
      });
    });

    // On save, switch back to view
    describe("Switch back to ShowJob on save", () => {
      let wrapper;

      beforeEach(() => {
        wrapper = mount(ShowJob, {
            propsData: { job },
            components: { EditJob }
          });
        expect(wrapper.exists()).toBeTruthy();
      });

      afterEach(() => {
        wrapper.destroy();
      });

      it("Switches back to show job view (hides edit job) upon handling 'job-saved' event", async () => {
        // First, switch to edit mode so that the EditJob component is rendered:
        wrapper.findComponent({ ref: "btn-edit-job" }).trigger('click');
        await wrapper.vm.$nextTick(); // Wait for the DOM to update.

        // Next, trigger 'job-saved' event in child component.
        await wrapper.findComponent(EditJob).vm.$emit('job-saved', job);

        // Expect to be back in ShowJob mode.
        expect(wrapper.findComponent(EditJob).exists()).toBe(false);
        expect(wrapper.findComponent({ ref: "btn-edit-job" }).exists()).toBe(true);
      });
    });
  });
});
