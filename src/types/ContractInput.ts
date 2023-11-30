import { ContractType } from "../data/ContractType"

type ContractInput = {
    UUID: string,
    contractType: ContractType,
    contractName: string,
    landlordInfo: {
        firstName: string,
        lastName: string,
        phoneNumber: string | undefined, 
        email: string | undefined
    }, 
    tenantInfo: {
        firstName: string,
        lastName: string,
        phoneNumber: string | undefined, 
        email: string | undefined
    }, 
    additionalClausules: [string]
}

export default ContractInput;