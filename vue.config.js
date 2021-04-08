module.exports = {
  pwa: {
    name: "Brandmobile QUiz",
    themeColor: "#352868",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",

    // configure the workbox plugin
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      // ...other Workbox options...
    },
  },
};
