import * as CUI from "@chakra-ui/react";

export const GetLinks = (type: string) => {
  const links = {
    ["sho24001"]: {
      link: "https://www.medicaid.gov/federal-policy-guidance/downloads/sho24001.pdf",
      label:
        '"2025 Updates to the Child and Adult Core Health Care Quality Measurement Sets and Mandatory Reporting Guidance" State Health Official letter',
      aria: "2025 Updates to the Child and Adult Core Health Care Quality Measurement Sets and Mandatory Reporting Guidance State Health Official letter",
    },
    ["hss-standard"]: {
      link: "https://aspe.hhs.gov/sites/default/files/migrated_legacy_files/43681/index.pdf",
      label: "2011 HHS standards",
      aria: "2011 HHS standards",
    },
    ["initial-core"]: {
      link: "https://www.medicaid.gov/federal-policy-guidance/downloads/smd24002.pdf",
      label:
        "Initial Core Set Mandatory Reporting Guidance for the Health Home Core Set",
      aria: "Initial Core Set Mandatory Reporting Guidance for the Health Home Core Set",
    },
    ["1997-omb"]: {
      link: "https://www.govinfo.gov/content/pkg/FR-1997-10-30/pdf/97-28653.pdf",
      label:
        "1997 Office of Management and Budget (OMB) minimum race and ethnicity categories",
      aria: "1997 Office of Management and Budget (OMB) minimum race and ethnicity categories",
    },
    ["1997-omb-for-2026"]: {
      link: "https://www.govinfo.gov/content/pkg/FR-1997-10-30/pdf/97-28653.pdf",
      label:
        "1997 Office of Management and Budget (OMB) minimum race and ethnicity standards",
      aria: "1997 Office of Management and Budget (OMB) minimum race and ethnicity standards",
    },
    ["2024-omb"]: {
      link: "https://www.federalregister.gov/d/2024-06469",
      label:
        "2024 OMB Statistical Policy Directive No. 15 race and ethnicity standards",
      aria: "2024 OMB Statistical Policy Directive No. 15 race and ethnicity standards",
    },
    ["strat-ta-resource"]: {
      link: "https://www.medicaid.gov/medicaid/quality-of-care/downloads/QMR-stratification-resource.pdf",
      label: "stratification TA resource",
      aria: "stratification TA resource",
    },
  };

  const data = links[type as keyof typeof links];

  if (!data) return null;

  return (
    <CUI.Link href={data.link} target={"_blank"} aria-label={data.aria}>
      {data.label}
    </CUI.Link>
  );
};
