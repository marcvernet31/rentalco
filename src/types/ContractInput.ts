import { ContractType } from "../data/ContractType"

type ContractInput = {
    UUID: string,
    userId: string,
    contractType: ContractType,
    contractName: string,
    creationDate: string,
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
    additionalClausules: string[]
}

export default ContractInput;