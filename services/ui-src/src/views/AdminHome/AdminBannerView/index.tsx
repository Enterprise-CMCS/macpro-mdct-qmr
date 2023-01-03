import { Text } from "@chakra-ui/react";
import { CurrentBanner } from "components/Banner/CurrentBanner";
import { CreateBannerForm } from "components/Banner/CreateBannerForm";
import { useEffect, useState } from "react";
import { AdminBannerData, BannerData } from "types";
import { bannerId } from "utils";
import { useGetBanner, useWriteBanner, useDeleteBanner } from "hooks/api";
import { Alert } from "@cmsgov/design-system";
import "@cmsgov/design-system/dist/css/index.css";

export const BANNER_ERRORS = {
  GET_BANNER_FAILED: "Banner could not be fetched. Please contact support.",
  DELETE_BANNER_FAILED:
    "Current banner could not be deleted. Please contact support.",
  REPLACE_BANNER_FAILED:
    "Current banner could not be replaced. Please contact support.",
};
export const AdminBannerView = () => {
  const [error, setError] = useState<string | undefined>();
  const [banner, setBanner] = useState<BannerData>();

  const bannerData = useGetBanner(bannerId);
  const writeMutation = useWriteBanner();
  const deleteMutation = useDeleteBanner();

  const onSubmitHandler = (formData: any) => {
    const bannerData: AdminBannerData = {
      key: bannerId,
      title: formData.bannerTitle,
      description: formData.bannerDescription,
      link: formData.bannerLink,
      startDate: formData.startDateInMS,
      endDate: formData.endDateInMS,
    };
    writeMutation.mutate(bannerData, {
      onSuccess: () => {
        setBanner(bannerData);
      },
      onError: () => {
        setError(BANNER_ERRORS.REPLACE_BANNER_FAILED);
      },
    });
  };

  const onDeleteHandler = () => {
    deleteMutation.mutate(bannerId, {
      onSuccess: () => {
        setBanner(undefined);
      },
      onError: () => {
        setError(BANNER_ERRORS.DELETE_BANNER_FAILED);
      },
    });
  };

  const onErrorHandler = (errorMessage: string) => {
    setError(errorMessage);
  };

  useEffect(() => {
    if (!banner && bannerData.isFetched) {
      setBanner(bannerData.data as BannerData);
    }
  }, [banner, bannerData]);

  return (
    <div className="ds-u-border--1 ds-u-padding--6">
      <div className="ds-l-container">
        {error && (
          <Alert heading="Banner Error" variation="error">
            <p className="ds-c-alert__text">{error}</p>
          </Alert>
        )}
        <Text className="ds-text-heading--3xl">Banner Admin</Text>
        <Text>Manage the announcement banner below.</Text>
        <Text className="ds-text-heading--2xl">Current Banner</Text>
        <CurrentBanner
          bannerData={banner}
          onError={onErrorHandler}
          onDelete={onDeleteHandler}
        />
        <Text className="ds-text-heading--2xl">Create a New Banner</Text>
        <CreateBannerForm writeAdminBanner={onSubmitHandler}></CreateBannerForm>
      </div>
    </div>
  );
};
