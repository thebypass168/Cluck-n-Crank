// Override menu for 4 combos
(() => {
  function overrideMenu() {
    try {
      if (typeof menu === "undefined" || typeof categories === "undefined" || typeof sauceOptions === "undefined" || typeof extraOptions === "undefined") return;

      // Categories: only All and Combos
      categories.length = 0;
      categories.push(
        { label: "All", key: "all" },
        { label: "Combos", key: "combos" }
      );

      // Sauces: Crank default + alternatives
      sauceOptions.length = 0;
      sauceOptions.push(
        { value: "Crank Sauce", description: "Default on every combo", price: 0 },
        { value: "Smoken Sauce", description: "Smoky finish", price: 0 },
        { value: "Screamn Pickle Sauce", description: "Pickle heat", price: 0 }
      );

      // Extras
      extraOptions.length = 0;
      extraOptions.push(
        { key: "extraSauce", label: "Extra Sauce (50¢)", price: 0.5 },
        { key: "extraStrip", label: "Extra Strip ($1.50)", price: 1.5 }
      );

      // Heat (keep something present even if combos don't use it)
      if (typeof heatOptions !== "undefined") {
        heatOptions.length = 0;
        heatOptions.push({ key: "none", label: "No Heat", price: 0 });
      }

      // Menu: 4 combos
      menu.length = 0;
      menu.push(
        {
          id: "combo-2-strip",
          category: "combos",
          price: 12.99,
          name: "2 Strip Combo",
          description: "2 strips + fries + 2 pickle bombs + drink",
          config: { heat: false, sauce: true, side: false, drinkSize: false, extras: true },
          image: "",
        },
        {
          id: "combo-4-strip",
          category: "combos",
          price: 14.99,
          name: "4 Strip Combo",
          description: "4 strips + fries + 2 pickle bombs + drink",
          config: { heat: false, sauce: true, side: false, drinkSize: false, extras: true },
          image: "",
        },
        {
          id: "combo-6-strip",
          category: "combos",
          price: 16.99,
          name: "6 Strip Combo",
          description: "6 strips + fries + 2 pickle bombs + drink",
          config: { heat: false, sauce: true, side: false, drinkSize: false, extras: true },
          image: "",
        },
        {
          id: "combo-2-strip-sandwich",
          category: "combos",
          price: 15.99,
          name: "2 Strip Sandwich Combo",
          description: "2 strip sandwich + fries + drink",
          config: { heat: false, sauce: true, side: false, drinkSize: false, extras: true },
          image: "",
        }
      );

      if (typeof state !== "undefined") {
        state.category = categories.some((c) => c.key === "combos") ? "combos" : "all";
      }

      if (typeof renderAll === "function") renderAll();
    } catch (e) {}
  }

  window.addEventListener("load", overrideMenu);
})();
