import { AWSError } from "aws-sdk";
import DynamodbReader from "./DynamodbReader";
import { ItemList } from "aws-sdk/clients/dynamodb";

const TABLE_NAME = "rentalco-contracts"

export default class ContractTableReader extends DynamodbReader {
  constructor() {
    super(TABLE_NAME)
  }

  public queryByUserId = (userId: string, callback: (err: AWSError | undefined, data: ItemList | undefined) => void) => {
    const params = {
      TableName: super.getTableName(),
        FilterExpression: 'userId = :u',
        ExpressionAttributeValues: {
          ':u': userId,
        },
      };
        
      super.getClient().scan(params, function(err, data) {
        if (err) {
          callback(err, undefined);                    
        } else {
          callback(undefined, data.Items)
        }
      });
  }
}