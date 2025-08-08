import * as CUI from "@chakra-ui/react";

export const SupportLinks = () => (
  <CUI.Text>
    For technical questions regarding use of this application, please reach out
    to{" "}
    <CUI.Link
      href="mailto:MDCT_help@cms.hhs.gov"
      color="blue.600"
      aria-label="Email address for technical assistance"
    >
      MDCT_help@cms.hhs.gov
    </CUI.Link>
    . For content-related questions, such as about measure specifications or
    what information to enter into each field, please reach out to{" "}
    <CUI.Link
      href="mailto:MACQualityTA@cms.hhs.gov"
      color="blue.600"
      aria-label="Email address for help regarding content"
    >
      MACQualityTA@cms.hhs.gov
    </CUI.Link>
    .
  </CUI.Text>
);
export const SupportInfo = () => (
  <>
    <SupportLinks />
    <CUI.Text
      paddingTop="4"
      fontSize="x-small"
      color="gray.700"
      line-height="normal"
    >
      PRA Disclosure Statement: Centers for Medicare & Medicaid Services (CMS)
      collects this mandatory information in accordance with (42 U.S.C. 1396a)
      and (42 CFR 430.12); which sets forth the authority for the submittal and
      collection of state plans and plan amendment information in a format
      defined by CMS for the purpose of improving the state application and
      federal review processes, improve federal program management of Medicaid
      programs and Children’s Health Insurance Program, and to standardize
      Medicaid program data which covers basic requirements, and individual
      content that reflects the characteristics of the particular state’s
      program. The information will be used to monitor and analyze performance
      metrics related to the Medicaid and Children’s Health Insurance Program in
      efforts to boost program integrity efforts, improve performance and
      accountability across the programs. Under the Privacy Act of 1974 any
      personally identifying information obtained will be kept private to the
      extent of the law. According to the Paperwork Reduction Act of 1995, no
      persons are required to respond to a collection of information unless it
      displays a valid OMB control number. The valid OMB control number for this
      information collection is 0938-1188. The time required to complete and
      review the information collection is estimated to range from 1 hour to 80
      hours per response (see below), including the time to review instructions,
      search existing data resources, gather the data needed, and complete and
      review the information collection. If you have comments concerning the
      accuracy of the time estimate(s) or suggestions for improving this form,
      please write to: CMS, 7500 Security Boulevard, Attn: PRA Reports Clearance
      Office, Mail Stop C4-26-05, Baltimore, Maryland 21244-1850.
    </CUI.Text>
  </>
);

export const HealthHomeInfo = () => (
  <>
    <CUI.Text paddingTop="4" color="gray.700" line-height="normal">
      The Health Home provision, authorized by section 2703 of the Affordable
      Care Act (section 1945 of the Social Security Act), provides an
      opportunity to build a person-centered care delivery model that focuses on
      improving outcomes and disease management for beneficiaries with chronic
      conditions. The Health Home Core Set of quality measures will be used to
      evaluate care across all state Health Home Programs. Specifically, section
      2703 requires Health Home providers to report health care quality measures
      in order to receive payment. The recommended Health Home Core Set will
      require reporting at the Health Home provider level which the state will
      collect and aggregate at the Health Home Program level.
    </CUI.Text>
  </>
);
