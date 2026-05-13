// CNC runtime override for a super-simple menu
// This mutates the inline globals from index.html (menu/categories/options)
// and re-renders the UI.

(function () {
  function overrideMenu() {
    try {
      if (!window.menu || !window.categories || !window.extraOptions || !window.sauceOptions) {
        return;
      }

      // categories: All + Combos
      window.categories.length = 0;
      window.categories.push(
        { id: "all", label: "All" },
        { id: "combos", label: "Combos" }
      );

      // Sauce options (Crank default)
      window.sauceOptions.length = 0;
      window.sauceOptions.push(
        {
          value: "Crank Sauce",
          description: "House default (served on every combo)",
          price: 0
        },
        {
          value: "Screamn Pickle",
          description: "Bright pickle heat",
          price: 0
        },
        {
          value: "Smoken Sauce",
          description: "Smoky finish",
          price: 0
        }
      );

      // Extra options (keep keys so the inline script keeps working)
      window.extraOptions.length = 0;
      window.extraOptions.push(
        {
          key: "extraSauce",
          label: "Extra Sauce",
          description: "Extra sauce cup",
          price: 0.5
        },
        {
          key: "extraStrip",
          label: "Extra Strip",
          description: "Add one extra strip",
          price: 1.5
        }
      );

      // Optional: zero-out any heat upcharge (even if heat stays enabled)
      if (Array.isArray(window.heatOptions)) {
        window.heatOptions.forEach((opt) => (opt.price = 0));
      }

      // Define the 4 combos
      window.menu.length = 0;
      window.menu.push(
        {
          id: "combo-2-strip",
          category: "combos",
          badge: "Simple Menu",
          name: "2 Strip Combo",
          description: "2 strips, fries, 2 pickle bombs, drink. Crank sauce default.",
          price: 12.99,
          tags: ["2 strips", "fries", "drink"],
          config: { heat: false, sauce: true, side: false, drinkSize: false, extras: true }
        },
        {
          id: "combo-4-strip",
          category: "combos",
          badge: "Simple Menu",
          name: "4 Strip Combo",
          description: "4 strips, fries, 2 pickle bombs, drink. Crank sauce default.",
          price: 14.99,
          tags: ["4 strips", "fries", "drink"],
          config: { heat: false, sauce: true, side: false, drinkSize: false, extras: true }
        },
        {
          id: "combo-6-strip",
          category: "combos",
          badge: "Simple Menu",
          name: "6 Strip Combo",
          description: "6 strips, fries, 2 pickle bombs, drink. Crank sauce default.",
          price: 16.99,
          tags: ["6 strips", "fries", "drink"],
          config: { heat: false, sauce: true, side: false, drinkSize: false, extras: true }
        },
        {
          id: "sandwich-2-strip",
          category: "combos",
          badge: "Simple Menu",
          name: "2 Strip Sandwich Combo",
          description: "2 strip sandwich, fries, drink. Crank sauce default.",
          price: 15.99,
          tags: ["sandwich", "2 strips", "drink"],
          config: { heat: false, sauce: true, side: false, drinkSize: false, extras: true }
        }
      );

      if (!window.categories.find((c) => c.id === window.state.category)) {
        window.state.category = "all";
      }

      // Replace selection summary text for the repurposed keys
      window.summarizeSelection = function summarizeSelection(item, selection) {
        const parts = [];
        if (!item || !selection) return "";

        if (item.config.sauce && selection.sauce) parts.push(selection.sauce);
        if (selection.extraSauce) parts.push("Extra sauce");
        if (selection.extraStrip) parts.push("Extra strip");

        return parts.join(" • ");
      };

      if (typeof window.renderAll === "function") {
        window.renderAll();
      }

      console.debug("CNC override applied");
    } catch (err) {
      console.warn("CNC override failed", err);
    }
  }

  // Run after the inline script initializes
  window.addEventListener("load", () => {
    setTimeout(overrideMenu, 50);
  });
})();
