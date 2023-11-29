import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts";

import { Constants } from "../utils/Constants";

const sessionName = "session-name"

export default class STSAccessor {
    private roleARN: string;
    private stsClient: STSClient;

    constructor(roleARN: string) {
        this.roleARN = roleARN
        this.stsClient = new STSClient({ region: Constants.awsRegionName });
    }

    public async getCredentials() {
        const assumeRoleCommand = new AssumeRoleCommand({
            RoleArn: this.roleARN,
            RoleSessionName: sessionName
          });
          const data = await this.stsClient.send(assumeRoleCommand);
          return data.Credentials;
    }
}
