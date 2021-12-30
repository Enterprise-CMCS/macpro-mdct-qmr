import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { Params } from "Routes";
import { AiFillWarning } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Api from "hooks/api";
import { queryClient } from "../../index";

interface ChildCoreSet {
  "ChildCoreSet-ReportType": string;
}

const ChildCoreSetSchema = Joi.object<ChildCoreSet>({
  "ChildCoreSet-ReportType": Joi.string(),
});

export const AddChildCoreSet = () => {
  const mutation = Api.useAddCoreSet();
  const navigate = useNavigate();

  const methods = useForm({
    shouldUnregister: true,
    mode: "all",
    resolver: joiResolver(ChildCoreSetSchema),
  });
  const { state, year } = useParams<Params>();
  const register = useCustomRegister<ChildCoreSet>();

  const handleSave = () => {
    console.log("saved");
  };

  const handleSubmit = (data: ChildCoreSet) => {
    console.log({ data });
    if (data["ChildCoreSet-ReportType"] === "separate") {
      mutation.mutate(CoreSetAbbr.CCSM, {
        onSuccess: () => {
          mutation.mutate(CoreSetAbbr.CCSC, {
            onSuccess: () => {
              queryClient.refetchQueries(["coreSets", state, year]);
              navigate(`/${state}/${year}`);
            },
          });
        },
      });
    } else if (data["ChildCoreSet-ReportType"] === "combined") {
      mutation.mutate(CoreSetAbbr.CCS, {
        onSuccess: () => {
          queryClient.refetchQueries(["coreSets", state, year]);
          navigate(`/${state}/${year}`);
        },
      });
    }
  };

  return (
    <QMR.StateLayout
      breadcrumbItems={[
        { path: `/${state}/${year}`, name: `FFY ${year}` },
        { path: `/${state}/${year}/add-child`, name: "Add Child Core Set" },
      ]}
      buttons={
        <>
          {/* Icon and text are placeholders until we have save functionality */}
          <AiFillWarning />
          <CUI.Text pl="1" pr="5">
            Unsaved Changes
          </CUI.Text>
          <QMR.ContainedButton buttonText="Save" onClick={handleSave} />
        </>
      }
    >
      <CUI.Stack spacing="5">
        <CUI.Heading fontSize="2xl">Child Core Set Details</CUI.Heading>
        <CUI.Text>
          Complete the details below and when finished create the additional
          Child Core Set report(s).
        </CUI.Text>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <CUI.Container maxW="container.xl" as="section">
              <CUI.Stack spacing="10">
                <QMR.RadioButton
                  formLabelProps={{ fontWeight: 600 }}
                  label="1. How are you reporting Child Core Set measures?"
                  {...register("ChildCoreSet-ReportType")}
                  options={[
                    {
                      displayValue:
                        "Reporting Medicaid and CHIP measures in separate core sets",
                      value: "separate",
                    },
                    {
                      displayValue:
                        "Reporting Medicaid and CHIP measures in combined core sets",
                      value: "combined",
                    },
                  ]}
                />
                <CUI.Box>
                  <CUI.Text fontWeight="600">
                    2. Finish to create the Child Core Set report(s)
                  </CUI.Text>
                  <CUI.Text pl={4} pt={1}>
                    Remember to complete all Child Core Set Questions and Child
                    Core Set Measures to submit for CMS review.
                  </CUI.Text>

                  <CUI.HStack paddingTop="5">
                    <QMR.ContainedButton
                      buttonProps={{ type: "submit" }}
                      buttonText="Create"
                    />
                    <QMR.ContainedButton
                      buttonProps={{ color: "blue", colorScheme: "white" }}
                      buttonText="Cancel"
                    />
                  </CUI.HStack>
                </CUI.Box>
              </CUI.Stack>
            </CUI.Container>
          </form>
        </FormProvider>
      </CUI.Stack>
    </QMR.StateLayout>
  );
};
