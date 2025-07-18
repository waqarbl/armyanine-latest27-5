import ComponentCard from "../../common/ComponentCard";
import Input from "../input/InputField";
import Radio from "../input/Radio";

interface RadioInputsProps {
  onChange: (name: string, value: boolean | string) => void;
  formData: {
    isDeath: boolean;
    isSold: boolean;
    isLoan: boolean;
    isTransfer: boolean;
    CDN: boolean;
    CNS: boolean;
    cdnDate?: string;
    cnsDate?: string;
    deathDate?: string;
    soldDate?: string;
    loanDate?: string;
    transferDate?: string;
    soldRemarks?: string;
    soldTo?: string;
    loanRemarks?: string;
    loanTo?: string;
    transferRemarks?: string;
    transferTo?: string;
    deathReason?: string;
    cnsTo?: string;
    cnsRemarks?: string;
  };
}
export default function RadioButtons({ onChange, formData }: RadioInputsProps) {
  // const [selectedDeadValue, setSelectedDeadValue] = useState<string>("option2");
  // const [selectedSoldValue, setSelectedSoldValue] = useState<string>("option2");
  // const [selectedLoanValue, setSelectedLoanSoldValue] = useState<string>("option2");
  // const [selectedTransferedValue, setSelectedTransferedLoanSoldValue] = useState<string>("option2");

  // const handleDeadRadioChange = (value: string) => {
  //   setSelectedDeadValue(value);
  // };
  // const handleSoldRadioChange = (value: string) => {
  //   setSelectedSoldValue(value);
  // };
  // const handleLoanRadioChange = (value: string) => {
  //   setSelectedLoanSoldValue(value);
  // };
  // const handleTramsferedRadioChange = (value: string) => {
  //   setSelectedTransferedLoanSoldValue(value);
  // };
  return (
    <>
      <ComponentCard title="Is Dog Dead?">
        <div className="flex flex-wrap items-center gap-8">
          <Radio
            id="radio1"
            name="group1"
            value="option1"
            checked={formData.isDeath === true}
            onChange={() => onChange("isDeath", true)}
            label="yes"
          />
          <Radio
            id="radio2"
            name="group1"
            value="option2"
            checked={formData.isDeath === false}
            onChange={() => onChange("isDeath", false)}
            label="No"
          />
          {formData.isDeath && (
            <Input
              type="date"
              className="mt-2 border rounded p-2 text-sm"
              value={formData.deathDate || ""}
              onChange={(e) => onChange("deathDate", e.target.value)}
            />

          )}

          {formData.isDeath && (
            <Input
              type="text"
              placeholder="Death Reason"
              className="mt-2 border rounded p-2 text-sm"
              value={formData.deathReason || ""}
              onChange={(e) => onChange("deathReason", e.target.value)}
            />

          )}

        </div>
      </ComponentCard>
      <ComponentCard title="Was Dog Sold?">
        <div className="flex flex-wrap items-center gap-8">
          <Radio
            id="isSoldYes"
            name="isSold"
            value="isSold"
            checked={formData.isSold === true}
            onChange={() => onChange("isSold", true)}
            label="yes"
          />
          <Radio
            id="isSoldNo"
            name="isSold"
            value="isSold"
            checked={formData.isSold === false}
            onChange={() => onChange("isSold", false)}
            label="No"
          />
          {formData?.isSold && (
            <Input
              type="date"
              className="mt-2 border rounded p-2 text-sm"
              value={formData?.soldDate || ""}
              onChange={(e) => onChange("soldDate", e.target.value)}
            />
          )}
          {formData?.isSold && (
            <Input
              type="text"
              className="mt-2 border rounded p-2 text-sm"
              placeholder="Sold To"
              value={formData?.soldTo || ""}
              onChange={(e) => onChange("soldTo", e.target.value)}
            />
          )}
          {formData?.isSold && (
            <Input
              type="text"
              placeholder="Sale Remarks"
              className="mt-2 border rounded p-2 text-sm"
              value={formData?.soldRemarks || ""}
              onChange={(e) => onChange("soldRemarks", e.target.value)}
            />
          )}
        </div>
      </ComponentCard>
      <ComponentCard title="Is Dog on Loan?">
        <div className="flex flex-wrap items-center gap-8">
          <Radio
            id="isLoanYes"
            name="isLoan"
            value="isLoan"
            checked={formData.isLoan === true}
            onChange={() => onChange("isLoan", true)}
            label="Yes"
          />
          <Radio
            id="isLoanNo"
            name="isLoan"
            value="isLoan"
            checked={formData.isLoan === false}
            onChange={() => onChange("isLoan", false)}
            label="No"
          />
          {formData.isLoan && (
            <Input
              type="date"
              className="mt-2 border rounded p-2 text-sm"
              value={formData.loanDate || ""}
              onChange={(e) => onChange("loanDate", e.target.value)}
            />
          )}
          {formData.isLoan && (
            <Input
              type="text"
              className="mt-2 border rounded p-2 text-sm"
              placeholder="Loan To"
              value={formData.loanTo || ""}
              onChange={(e) => onChange("loanTo", e.target.value)}
            />
          )}

          {formData.isLoan && (
            <Input
              type="text"
              className="mt-2 border rounded p-2 text-sm"
              placeholder="Loan Remarks"
              value={formData.loanRemarks || ""}
              onChange={(e) => onChange("loanRemarks", e.target.value)}
            />
          )}
        </div>
      </ComponentCard>
      <ComponentCard title="Has Dog been Transferred?">
        <div className="flex flex-wrap items-center gap-8">
          <Radio
            id="isTransferYes"
            name="isTransfer"
            value="isTransfer"
            checked={formData.isTransfer === true}
            onChange={() => onChange("isTransfer", true)}
            label="Yes"
          />
          <Radio
            id="isTransferNo"
            name="isTransfer"
            value="isTransfer"
            checked={formData.isTransfer === false}
            onChange={() => onChange("isTransfer", false)}
            label="No"
          />
          {formData.isTransfer && (
            <Input
              type="date"
              className="mt-2 border rounded p-2 text-sm"
              value={formData.transferDate || ""}
              onChange={(e) => onChange("transferDate", e.target.value)}
            />
          )}

          {formData.isTransfer && (
            <Input
              type="text"
              className="mt-2 border rounded p-2 text-sm"
              placeholder="Transfer To"
              value={formData.transferTo || ""}
              onChange={(e) => onChange("transferTo", e.target.value)}
            />
          )}
          {formData.isTransfer && (
            <Input
              type="text"
              className="mt-2 border rounded p-2 text-sm"
              placeholder="Transfer Remarks"
              value={formData.transferRemarks || ""}
              onChange={(e) => onChange("transferRemarks", e.target.value)}
            />
          )}

        </div>
      </ComponentCard>
      <ComponentCard title="C&D">
        <div className="flex flex-wrap items-center gap-8">
          <Radio
            id="CNDYes"
            name="CDN"
            value="CDN"
            checked={formData.CDN === true}
            onChange={() => onChange("CDN", true)}
            label="Yes"
          />
          <Radio
            id="CDNNo"
            name="CDN"
            value="CDN"
            checked={formData.CDN === false}
            onChange={() => onChange("CDN", false)}
            label="No"
          />
          {formData.CDN && (
            <Input
              type="date"
              className="mt-2 border rounded p-2 text-sm"
              value={formData.cdnDate || ""}
              onChange={(e) => onChange("cdnDate", e.target.value)}
            />
          )}
        </div>
      </ComponentCard>
      <ComponentCard title="C&S">
        <div className="flex flex-wrap items-center gap-8">
          <Radio
            id="CNSYes"
            name="CNS"
            value="CNS"
            checked={formData.CNS === true}
            onChange={() => onChange("CNS", true)}
            label="Yes"
          />
          <Radio
            id="CNSNo"
            name="CNS"
            value="CNS"
            checked={formData.CNS === false}
            onChange={() => onChange("CNS", false)}
            label="No"
          />
          {formData.CNS && (
            <Input
              type="date"
              className="mt-2 border rounded p-2 text-sm"
              value={formData.cnsDate || ""}
              onChange={(e) => onChange("cnsDate", e.target.value)}
            />
          )}
          {formData.CNS && (
            <Input
              type="text"
              className="mt-2 border rounded p-2 text-sm"
              placeholder="Sold To"
              value={formData.cnsTo || ""}
              onChange={(e) => onChange("cnsTo", e.target.value)}
            />
          )}

          {formData.CNS && (
            <Input
              type="text"
              className="mt-2 border rounded p-2 text-sm"
              placeholder="C & S Remarks"
              value={formData.cnsRemarks || ""}
              onChange={(e) => onChange("cnsRemarks", e.target.value)}
            />
          )}
        </div>
      </ComponentCard>
    </>
  );
}
