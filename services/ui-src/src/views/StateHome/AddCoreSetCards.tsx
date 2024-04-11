import { Link, useParams } from "react-router-dom";
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useUser } from "hooks/authHooks";
import { coreSets } from "shared/coreSetByYear";

interface AddCoreSetCardProps {
  title: string;
  buttonText: string;
  to: string;
  coreSetExists: boolean;
}

export const AddCoreSetCard = ({
  title,
  buttonText,
  to,
  coreSetExists,
}: AddCoreSetCardProps) => {
  const { isStateUser } = useUser();
  const { state, year } = useParams();

  return (
    <CUI.Box
      as="aside"
      borderRadius="base"
      borderWidth="thin"
      borderLeftWidth="1rem"
      borderLeftColor="blue.500"
      minW="363px"
      p="6"
    >
      <CUI.Stack spacing="6">
        <CUI.Text fontWeight="bold">{title}</CUI.Text>
        <Link
          to={`/${state}/${year}/${to}`}
          style={{
            textDecoration: "none",
          }}
        >
          <QMR.ContainedButton
            disabledStatus={!isStateUser || coreSetExists}
            icon="plus"
            testId={to + "button"}
            buttonText={!coreSetExists ? buttonText : "Already Added"}
            buttonProps={{
              colorScheme: "blue",
              variant: "outline",
              color: "blue.500",
            }}
          />
        </Link>
      </CUI.Stack>
    </CUI.Box>
  );
};

interface Props {
  renderHealthHomeCoreSet?: boolean;
  coreSetsInTable?: string[];
}

export const AddCoreSetCards = ({
  coreSetsInTable,
}: // renderHealthHomeCoreSet = true,
Props) => {
  const { year } = useParams();

  const coreSetCards = (
    coreSets[year as keyof typeof coreSets] as any[]
  ).filter((set) => !set.loaded && set.type === "coreSet");

  return (
    <>
      {coreSetCards.map((coreSet: any) => {
        return (
          <AddCoreSetCard
            title={`Need to report on ${coreSet.title} data?`}
            buttonText={`Add ${coreSet.title} Core Set`}
            to={coreSet.path}
            coreSetExists={coreSet.abbr.some((abbr: string) =>
              coreSetsInTable?.includes(abbr)
            )}
          />
        );
      })}
      {/* 
      )}
      {year && parseInt(year) < 2024 && (
        <CUI.Center w="44" textAlign="center">
          <CUI.Text fontStyle="italic" fontSize="sm">
            Only one group of Adult Core Set Measures can be submitted per FFY
          </CUI.Text>
        </CUI.Center>
      )} */}
    </>
  );
};
