const { execSync } = require("child_process");
const path = require("path");

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;

  if (electronPlatformName !== "darwin") {
    return;
  }

  const profile = process.env.APPLE_KEYCHAIN_PROFILE;
  if (!profile) {
    console.log("APPLE_KEYCHAIN_PROFILE not set. Skipping notarization.");
    return;
  }

  const appName = context.packager.appInfo.productFilename;
  const appPath = path.join(appOutDir, `${appName}.app`);
  const zipPath = path.join(appOutDir, `${appName}-notarize.zip`);

  console.log(`Notarizing ${appPath} ...`);

  try {
    execSync(
      `ditto -c -k --sequesterRsrc --keepParent "${appPath}" "${zipPath}"`,
      {
        stdio: "inherit",
      }
    );

    execSync(
      `xcrun notarytool submit "${zipPath}" --keychain-profile "${profile}" --wait`,
      {
        stdio: "inherit",
        timeout: 600_000,
      }
    );

    execSync(`xcrun stapler staple "${appPath}"`, {
      stdio: "inherit",
    });
  } finally {
    execSync(`rm -f "${zipPath}"`, {
      stdio: "inherit",
    });
  }

  console.log("Notarization complete.");
};
