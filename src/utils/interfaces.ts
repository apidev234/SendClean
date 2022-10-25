export interface SendCleanOptions {
  owner_id: string;
  token: string;
}

export type ValidEvents = 'send' | 'open' | 'click' | 'hard_bounce' | 'soft_bounce' | 'spam';

export interface BaseResponse {
  status: string;
  message: string;
  code?: number;
  type?: string;
}

export interface AddSmtpSuccessResponse extends BaseResponse {
  smtp_user_name: string;
  smtp_password: string;
}

export interface ResetSMTPPasswordResponse extends BaseResponse {
  smtp_user_name: string;
  smtp_password: string;
}

export interface ListSmtp {
  smtp_user_name: string;
  hourly_limit: number | undefined;
  total_limit: number | undefined;
  status: string;
}

export interface ListSmtpResponse extends BaseResponse {
  smtp_list: ListSmtp[];
}

interface Validity {
  valid: boolean;
}
export interface TrackingDomainList {
  domain: string;
  cname: Validity;
  create_date: {
    microseconds: number;
    milliseconds: number;
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
  };
}

interface ToUser {
  email: string;
  name?: string;
  type?: 'to' | 'cc' | 'bcc';
}

interface MailAttachment {
  type?: string;
  name?: string;
  content?: string;
}

export interface SendTemplateMailParameters {
  smtp_user_name: string;
  message: {
    template_id: string;
    html?: string;
    text?: string;
    subject: string;
    from_email: string;
    dynamic_value?: Object;
    from_name?: string;
    to: ToUser[];
    headers?: Object;
    attachments?: MailAttachment[];
    images?: MailAttachment[];
  };
}

export interface SendMailParameters {
  smtp_user_name: string;
  message: {
    html?: string;
    text?: string;
    subject: string;
    from_email: string;
    from_name?: string;
    to: ToUser[];
    headers?: Object;
    attachments?: MailAttachment[];
    images?: MailAttachment[];
  };
}

export interface SendingDomainList {
  domain: string;
  create_date: {
    microseconds: number;
    milliseconds: number;
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
  };
  dkim: Validity;
  spf: Validity;
  verify_domain: Validity;
}

export interface ListSendingDomainsResponse extends BaseResponse {
  sending_domain_list: {
    domain: string;
    create_date: number;
    dkim: Validity;
    spf: Validity;
    verify_domain: Validity;
  }[];
}

export interface WebhookList {
  webhook_id: string;
  url: string;
  events: ValidEvents[];
  create_date: {
    microseconds: number;
    milliseconds: number;
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
  };
  store_log: boolean;
  key: string;
  description: string;
}

export interface ListWebhooksResponse extends BaseResponse {
  webhook_list: {
    webhook_id: string;
    url: string;
    event: string;
    create_date: number;
    store_log: string;
    key: string;
    description: string;
  }[];
}

export interface WebhookInfo {
  webhook_id: string;
  url: string;
  events: ValidEvents[];
  create_date: {
    microseconds: number;
    milliseconds: number;
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
  };
  store_log: boolean;
  key: string;
  description: string;
}

export interface WebhookInfoResponse extends BaseResponse {
  event: any;
  webhook_data: {
    webhook_id: string;
    url: string;
    event: string;
    create_date: number;
    store_log: string;
    key: string;
    description: string;
  };
}

export interface CheckTrackingDomainResponse extends BaseResponse {
  status: string;
  domain: string;
  valid_tracking: string;
  cname: Validity;
}

export interface WebhookKeyResponse extends BaseResponse {
  key: string;
}

export interface ListTrackingDomainsResponse extends BaseResponse {
  tracking_domain_list: {
    domain: string;
    cname: Validity;
    create_date: number;
  }[];
}

export interface CheckSendingDomainResponse extends BaseResponse {
  status: string;
  domain: string;
  spf: Validity;
  dkim: Validity;
  valid_signing: string;
}

export interface UpdateSmtpParameters {
  smtp_user_name: string;
  hourly_limit?: number;
  total_limit?: number;
  status?: string;
}

export interface UserInfo {
  name?: string;
  email?: string;
  mobile?: string;
  allowed_speed?: number;
  reputation?: string;
  create_date: {
    microseconds: number;
    milliseconds: number;
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
  };
}

export interface UserInfoResponse extends BaseResponse {
  user_data: {
    name?: string;
    email?: string;
    mobile?: string;
    allowed_speed?: number;
    reputation?: string;
    create_date: number;
  };
}
