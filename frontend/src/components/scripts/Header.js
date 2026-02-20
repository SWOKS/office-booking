import { inject } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "AppHeader",
  setup() {
    const store = inject("store");
    const router = useRouter();

    const handleLogout = () => {
      store.logout();
      router.push("/");
    };

    const scrollToContacts = () => {
      const contactsSection = document.getElementById("contacts");
      if (contactsSection) {
        contactsSection.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push("/");
        setTimeout(() => {
          const el = document.getElementById("contacts");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 500);
      }
    };

    return {
      store,
      handleLogout,
      scrollToContacts,
    };
  },
};
