const { createApp } = Vue;

createApp({
  data() {
    return {
      selectedTemplate: "", // Currently selected template
      userDetails: {
        fullName: "",
        email: "",
        phone: "",
        logo: "",
      },
      templates: [], // Array of template names fetched from the backend
      generatedSignature: "", // HTML version of the signature
      plainTextSignature: "", // Plain text version of the signature
    };
  },
  methods: {
    async fetchTemplates() {
      try {
        const response = await fetch("http://localhost:5000/api/templates");
        const data = await response.json();
        this.templates = data.templates; // Fetch all templates
        this.selectedTemplate = this.templates[0] || ""; // Default to the first template
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    },
    async generateSignature() {
      try {
        const response = await fetch("http://localhost:5000/api/signature", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            templateName: this.selectedTemplate,
            fullName: this.userDetails.fullName,
            email: this.userDetails.email,
            phone: this.userDetails.phone,
            logo: this.userDetails.logo || "https://via.placeholder.com/50",
          }),
        });
        const data = await response.json();
        this.generatedSignature = data.htmlSignature;
        this.plainTextSignature = data.plainTextSignature;
      } catch (error) {
        console.error("Error generating signature:", error);
      }
    },
  },
  mounted() {
    this.fetchTemplates();
  },
}).mount("#app");