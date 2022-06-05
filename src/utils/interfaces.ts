export interface SendCleanOptions {
  owner_id: string;
  token: string;
}

export interface AddSmtpSuccessResponse {
  status: string;
  message: string;
  smtp_user_name: string;
  smtp_password: string;
}

export interface ListSmtp {
  smtp_user_name: string;
  hourly_limit: number | undefined;
  total_limit: number | undefined;
  status: string;
}

interface ValiDity {
  valid: boolean;
}
export interface TrackingDomainList {
  domain: string;
  cname: ValiDity;
  create_date: number;
}

interface ToUser {
  email: string;
  name?: string;
  type?: Array<'to' | 'cc' | 'bcc'>;
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
  dkim: ValiDity;
  spf: ValiDity;
  verify_domain: ValiDity;
}

export interface checkTrackingDomainResponse {
  status: string;
  domain: string;
  valid_tracking: string;
  cname: ValiDity;
}

export interface checkSendingDomainResponse {
  status: string;
  domain: string;
  spf: ValiDity;
  dkim: ValiDity;
  valid_signing: string;
}

export interface UpdateSmtpParameters {
  smtp_user_name: string;
  hourly_limit?: number;
  total_limit?: number;
  status?: string;
}
