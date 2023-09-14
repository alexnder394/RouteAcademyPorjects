$("aside .right button").on("click", () => {
  $("aside .left").animate({ width: "toggle" });
  $("aside .right button i").toggleClass("fa-xmark");
  $("aside").toggleClass("open");
});

