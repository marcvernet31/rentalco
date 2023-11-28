import { AuthEventData } from '@aws-amplify/ui';
import { AuthUser } from "aws-amplify/auth";

type AuthInput = {
    signOut: ((data?: (AuthEventData | undefined)) => void) | undefined;
    user: AuthUser | undefined;
  };

export type {AuthInput}