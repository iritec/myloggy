const hasValue = (value) => typeof value === "string" && value.trim().length > 0;

const signingValid =
  hasValue(process.env.CSC_LINK) || hasValue(process.env.CSC_NAME);

const notarizationOptions = [
  {
    name: "App Store Connect API key",
    vars: ["APPLE_API_KEY", "APPLE_API_KEY_ID", "APPLE_API_ISSUER"],
  },
  {
    name: "Apple ID",
    vars: ["APPLE_ID", "APPLE_APP_SPECIFIC_PASSWORD", "APPLE_TEAM_ID"],
  },
  {
    name: "Keychain profile",
    vars: ["APPLE_KEYCHAIN_PROFILE"],
  },
];

const satisfiedNotarizationOptions = notarizationOptions.filter((option) =>
  option.vars.every((key) => hasValue(process.env[key]))
);

const errors = [];

if (!signingValid) {
  errors.push("code signing certificate is missing (set CSC_LINK or CSC_NAME)");
}

if (hasValue(process.env.CSC_LINK) && !hasValue(process.env.CSC_KEY_PASSWORD)) {
  errors.push("CSC_LINK is set but CSC_KEY_PASSWORD is missing");
}

if (satisfiedNotarizationOptions.length === 0) {
  errors.push(
    "notarization credentials are missing (set one of: " +
      notarizationOptions
        .map((option) => option.vars.join(" + "))
        .join(" / ") +
      ")"
  );
}

if (satisfiedNotarizationOptions.length > 1) {
  errors.push(
    "multiple notarization credential sets are configured; keep only one active method"
  );
}

if (errors.length > 0) {
  console.error("Mac production build prerequisites are not satisfied:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Mac production build prerequisites look valid.");
console.log(
  `- Signing: ${hasValue(process.env.CSC_LINK) ? "CSC_LINK" : "CSC_NAME"}`
);
console.log(`- Notarization: ${satisfiedNotarizationOptions[0].name}`);
