import { DataSource } from "./DataSource";
import SharedContext from "shared/SharedContext";
import commonQuestionsLabel2021 from "labels/2021/commonQuestionsLabel";
import commonQuestionsLabel2022 from "labels/2022/commonQuestionsLabel";
import commonQuestionsLabel2023 from "labels/2023/commonQuestionsLabel";
import commonQuestionsLabel2024 from "labels/2024/commonQuestionsLabel";

describe("Test the DataSourceCahps component", () => {
  it("Test DataSourceCahps label text for 2021", () => {
    const component = (
      <SharedContext.Provider value={commonQuestionsLabel2021}>
        <DataSource />
      </SharedContext.Provider>
    );
    const describeDataSrc =
      component.props.value.DataSourceCahps.describeDataSrc;
    expect(describeDataSrc).toEqual("Describe the data source:");
  });

  it("Test DataSourceCahps label text for 2022", () => {
    const component = (
      <SharedContext.Provider value={commonQuestionsLabel2022}>
        <DataSource />
      </SharedContext.Provider>
    );
    const describeDataSrc =
      component.props.value.DataSourceCahps.describeDataSrc;
    expect(describeDataSrc).toEqual("Describe the data source:");
  });

  it("Test DataSourceCahps label text for 2023", () => {
    const component = (
      <SharedContext.Provider value={commonQuestionsLabel2023}>
        <DataSource />
      </SharedContext.Provider>
    );
    const describeDataSrc =
      component.props.value.DataSourceCahps.describeDataSrc;
    expect(describeDataSrc).toEqual(
      "Describe the data source (<em>text in this field is included in publicly-reported state-specific comments</em>):"
    );
  });

  it("Test DataSourceCahps label text for 2024", () => {
    const component = (
      <SharedContext.Provider value={commonQuestionsLabel2024}>
        <DataSource />
      </SharedContext.Provider>
    );
    const describeDataSrc =
      component.props.value.DataSourceCahps.describeDataSrc;
    expect(describeDataSrc).toEqual(
      "Describe the data source (<em>text in this field is included in publicly-reported state-specific comments</em>):"
    );
  });
});
