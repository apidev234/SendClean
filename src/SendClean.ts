/**
 * @author ApiDev234
 * @copyright 2022-current ApiDev234
 */
import axios, { AxiosResponse } from 'axios';
import {
  AddSmtpSuccessResponse,
  checkSendingDomainResponse,
  checkTrackingDomainResponse,
  ListSmtp,
  SendCleanOptions,
  SendingDomainList,
  SendMailParameters,
  SendTemplateMailParameters,
  TrackingDomainList,
  UpdateSmtpParameters
} from './utils/interfaces';
import * as Endpoints from './Endpoints';
import { ValidationError } from './Errors/ValidationError';
import { GeneralError } from './Errors/GeneralError';
import { AuthenticationError } from './Errors/AuthenticationError';
import parse from './utils/parse';

/**
 * @class SendClean
 */
export class SendClean {
  /**
   * The User's Id For Requests.
   * @private
   */
  private owner_id: string;
  /**
   * The User's API Token For Requests.
   * @private
   */
  private token: string;
  /**
   * Create a new SendClean Client
   * @param options Options For Creating The Client.
   * @example
   * ```js
   * const { SendClean } = require('sendclean');
   *
   * const sendclean_client = new SendClean({
   * token: "YOUR_SENDCLEAN_TOKEN",
   * owner_id: "YOUR_SENDCLEAN_USERID"
   * })
   * ```
   */
  constructor(options: SendCleanOptions) {
    this.token = options.token;
    this.owner_id = options.owner_id;
  }
  /**
   * Create new Smtp User
   * @async
   * @param hourly_limit
   * @param total_limit
   * @returns {Promise<AddSmtpSuccessResponse>}
   */
  async addSmtpUser(hourly_limit: number, total_limit: number): Promise<AddSmtpSuccessResponse> {
    if (!hourly_limit || !(typeof hourly_limit !== 'number')) {
      throw new TypeError('Field hourly_limit (must be a no.) is required for adding smtp user.');
    }
    if (!total_limit || !(typeof total_limit !== 'number')) {
      throw new TypeError('Field total_limit (must be a no.) is required for adding smtp user.');
    }
    return new Promise<AddSmtpSuccessResponse>((resolve, reject) => {
      axios
        .post(Endpoints.ADD_SMTP_USER, {
          token: this.token,
          owner_id: this.owner_id,
          hourly_limit,
          total_limit
        })
        .then((res: AxiosResponse) => {
          if (res.data.status == 'error') {
            if (res.data.type == 'ValidationError') {
              reject(new ValidationError(res.data.message));
            }
            if (res.data.type == 'GeneralError') {
              reject(new GeneralError(res.data.message));
            }
            if (res.data.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.data.message));
            }
          } else {
            resolve(res.data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * Update an Existing Smtp User
   * @param options
   * @async
   * @returns {Promise<any>}
   */
  async updateSmtpUser(options: UpdateSmtpParameters): Promise<any> {
    if (!options.smtp_user_name) throw new TypeError('smtp_user_name is required.');
    if (
      (options.hourly_limit && isNaN(options.hourly_limit)) ||
      (options.total_limit && isNaN(options.total_limit))
    ) {
      throw new TypeError('Field hourly_limit and total_limit must be a number.');
    }
    return new Promise((resolve, reject) => {
      axios
        .post(Endpoints.UPDATE_SMTP_USER, {
          token: this.token,
          owner_id: this.owner_id,
          smtp_user_name: options.smtp_user_name,
          hourly_limit: options.hourly_limit,
          total_limit: options.total_limit
        })
        .then((res: AxiosResponse) => {
          if (res.data.status == 'error') {
            if (res.data.type == 'ValidationError') {
              reject(new ValidationError(res.data.message));
            }
            if (res.data.type == 'GeneralError') {
              reject(new GeneralError(res.data.message));
            }
            if (res.data.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.data.message));
            }
          } else {
            resolve(res.data);
          }
        });
    });
  }

  /**
   * Reset Smtp Password
   * @param smtp_user_name
   * @async
   * @returns {Promise<any>}
   */
  async resetSmtpPassword(smtp_user_name: string): Promise<any> {
    if (!smtp_user_name || !(typeof smtp_user_name !== 'string')) {
      throw new TypeError('smtp_user_name is required.');
    }
    return new Promise((resolve, reject) => {
      axios
        .post(Endpoints.RESET_SMTP_PASSWORD, {
          token: this.token,
          owner_id: this.owner_id,
          smtp_user_name
        })
        .then((res: AxiosResponse) => {
          if (res.data.status == 'error') {
            if (res.data.type == 'ValidationError') {
              reject(new ValidationError(res.data.message));
            }
            if (res.data.type == 'GeneralError') {
              reject(new GeneralError(res.data.message));
            }
            if (res.data.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.data.message));
            }
          } else {
            resolve(res.data);
          }
        });
    });
  }

  /**
   * List All Smtp Users
   * @async
   * @returns {Array<ListSmtp>}
   */
  async listSmtpUsers(): Promise<Array<ListSmtp>> {
    return new Promise<Array<ListSmtp>>((resolve, reject) => {
      axios
        .post(Endpoints.LIST_SMTP_USERS, {
          owner_id: this.owner_id,
          token: this.token
        })
        .then((res: AxiosResponse) => {
          if (res.data.status == 'error') {
            if (res.data.type == 'ValidationError') {
              reject(new ValidationError(res.data.message));
            }
            if (res.data.type == 'GeneralError') {
              reject(new GeneralError(res.data.message));
            }
            if (res.data.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.data.message));
            }
          } else {
            resolve(res.data.smtp_list);
          }
        });
    });
  }

  /**
   * Add a new Sending Domain
   * @param domain
   * @async
   * @returns {Promise<void>}
   */
  async addSendingDomain(domain: string): Promise<void> {
    if (!domain || !(typeof domain !== 'string')) {
      throw new TypeError('Domain (string) is required.');
    }
    return new Promise<void>((resolve, reject) => {
      axios
        .post(Endpoints.ADD_SENDING_DOMAIN, {
          token: this.token,
          owner_id: this.owner_id,
          domain
        })
        .then((res: AxiosResponse) => {
          if (res.data.status == 'error') {
            if (res.data.type == 'ValidationError') {
              reject(new ValidationError(res.data.message));
            }
            if (res.data.type == 'GeneralError') {
              reject(new GeneralError(res.data.message));
            }
            if (res.data.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.data.message));
            }
          } else {
            resolve();
          }
        });
    });
  }

  /**
   * Check For Sending Domain
   * @param domain
   * @async
   * @returns {Promise<checkSendingDomainResponse>}
   */
  async checkSendingDomain(domain: string): Promise<checkSendingDomainResponse> {
    if (!domain || !(typeof domain !== 'string')) {
      throw new TypeError('Domain (string) is required.');
    }
    return new Promise<checkSendingDomainResponse>((resolve, reject) => {
      axios
        .post(Endpoints.CHECK_SENDING_DOMAIN, {
          token: this.token,
          owner_id: this.owner_id,
          domain
        })
        .then((res: AxiosResponse) => {
          if (res.data.status == 'error') {
            if (res.data.type == 'ValidationError') {
              reject(new ValidationError(res.data.message));
            }
            if (res.data.type == 'GeneralError') {
              reject(new GeneralError(res.data.message));
            }
            if (res.data.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.data.message));
            }
          } else {
            resolve(res.data);
          }
        });
    });
  }

  /**
   * Verify Sending Domain
   * @param domain
   * @async
   * @returns {Promise<any>}
   */
  async verifySendingDomain(domain: string): Promise<any> {
    if (!domain || !(typeof domain !== 'string')) {
      throw new TypeError('Domain (string) is required.');
    }

    return new Promise((resolve, reject) => {
      axios
        .post(Endpoints.VERIFY_SENDING_DOMAIN, {
          token: this.token,
          owner_id: this.owner_id,
          domain
        })
        .then((res: AxiosResponse) => {
          if (res.data.status == 'error') {
            if (res.data.type == 'ValidationError') {
              reject(new ValidationError(res.data.message));
            }
            if (res.data.type == 'GeneralError') {
              reject(new GeneralError(res.data.message));
            }
            if (res.data.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.data.message));
            }
          } else {
            resolve(res.data);
          }
        });
    });
  }

  /**
   * List All Sending domains
   * @async
   * @returns {Promise<Array<SendingDomainList>>}
   */
  async listSendingDomains(): Promise<Array<SendingDomainList>> {
    return new Promise<Array<SendingDomainList>>((resolve, reject) => {
      axios
        .post(Endpoints.LIST_SENDING_DOMAIN, {
          token: this.token,
          owner_id: this.owner_id
        })
        .then((res: AxiosResponse) => {
          if (res.data.status == 'error') {
            if (res.data.type == 'ValidationError') {
              reject(new ValidationError(res.data.message));
            }
            if (res.data.type == 'GeneralError') {
              reject(new GeneralError(res.data.message));
            }
            if (res.data.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.data.message));
            }
          } else {
            let sendingDomains: any = [];
            res.data.sending_domain_list.forEach((domain: any) => {
              sendingDomains?.push({
                domain: domain.domain,
                create_date: parse(domain.create_date),
                verified: domain.verify_domain,
                spf: domain.spf,
                dkim: domain.dkim
              });
            });
            resolve(sendingDomains);
          }
        });
    });
  }

  /**
   * Delete a Sending Domain
   * @param domain
   * @async
   * @returns {Promise<void>}
   */
  async deleteSendingDomain(domain: string): Promise<void> {
    if (!domain || !(typeof domain !== 'string')) {
      throw new TypeError('Domain (string) is required.');
    }
    return new Promise<void>((resolve, reject) => {
      axios
        .post(Endpoints.DELETE_SENDING_DOMAIN, {
          token: this.token,
          owner_id: this.owner_id,
          domain
        })
        .then((res: AxiosResponse) => {
          if (res.data.status == 'error') {
            if (res.data.type == 'ValidationError') {
              reject(new ValidationError(res.data.message));
            }
            if (res.data.type == 'GeneralError') {
              reject(new GeneralError(res.data.message));
            }
            if (res.data.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.data.message));
            }
          } else {
            resolve();
          }
        });
    });
  }

  /**
   * Add a new tracking domain
   * @param domain
   * @async
   * @returns {Promise<void>}
   */
  async addTrackingDomain(domain: string): Promise<void> {
    if (!domain || !(typeof domain !== 'string')) {
      throw new TypeError('Domain (string) is required.');
    }
    return new Promise<void>((resolve, reject) => {
      axios
        .post(Endpoints.ADD_TRACKING_DOMAIN, {
          token: this.token,
          owner_id: this.owner_id,
          domain
        })
        .then((res: AxiosResponse) => {
          if (res.data.status == 'error') {
            if (res.data.type == 'ValidationError') {
              reject(new ValidationError(res.data.message));
            }
            if (res.data.type == 'GeneralError') {
              reject(new GeneralError(res.data.message));
            }
            if (res.data.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.data.message));
            }
          } else {
            resolve();
          }
        });
    });
  }

  /**
   * Check Tracking Domain
   * @param domain
   * @async
   * @returns {Promise<checkTrackingDomainResponse>}
   */
  async checkTrackingDomain(domain: string): Promise<checkTrackingDomainResponse> {
    if (!domain || !(typeof domain !== 'string')) {
      throw new TypeError('Domain (string) is required.');
    }
    return new Promise<checkTrackingDomainResponse>((resolve, reject) => {
      axios
        .post(Endpoints.CHECK_TRACKING_DOMAIN, {
          token: this.token,
          owner_id: this.owner_id,
          domain
        })
        .then((res: AxiosResponse) => {
          if (res.data.status == 'error') {
            if (res.data.type == 'ValidationError') {
              reject(new ValidationError(res.data.message));
            }
            if (res.data.type == 'GeneralError') {
              reject(new GeneralError(res.data.message));
            }
            if (res.data.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.data.message));
            }
          } else {
            resolve(res.data);
          }
        });
    });
  }

  /**
   * List All Tracking Domains
   * @async
   * @returns {Promise<Array<TrackingDomainList>>}
   */
  async listTrackingDomains(): Promise<Array<TrackingDomainList>> {
    return new Promise<Array<TrackingDomainList>>((resolve, reject) => {
      axios
        .post(Endpoints.LIST_TRACKING_DOMAIN, {
          token: this.token,
          owner_id: this.owner_id
        })
        .then((res: AxiosResponse) => {
          if (res.data.status == 'error') {
            if (res.data.type == 'ValidationError') {
              reject(new ValidationError(res.data.message));
            }
            if (res.data.type == 'GeneralError') {
              reject(new GeneralError(res.data.message));
            }
            if (res.data.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.data.message));
            }
          } else {
            let trackingDomains: any = [];
            res.data.tracking_domain_list.forEach((domain: any) => {
              trackingDomains?.push({
                domain: domain.domain,
                create_date: parse(domain.create_date)
              });
            });
            resolve(trackingDomains);
          }
        });
    });
  }

  /**
   * Delete a tracking domain
   * @param domain
   * @returns {Promise<void>}
   */
  async deleteTrackingDomain(domain: string): Promise<void> {
    if (!domain || !(typeof domain !== 'string')) {
      throw new TypeError('Domain (string) is required.');
    }
    return new Promise<void>((resolve, reject) => {
      axios
        .post(Endpoints.DELETE_TRACKING_DOMAIN, {
          token: this.token,
          owner_id: this.owner_id,
          domain
        })
        .then((res: AxiosResponse) => {
          if (res.data.status == 'error') {
            if (res.data.type == 'ValidationError') {
              reject(new ValidationError(res.data.message));
            }
            if (res.data.type == 'GeneralError') {
              reject(new GeneralError(res.data.message));
            }
            if (res.data.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.data.message));
            }
          } else {
            resolve();
          }
        });
    });
  }

  /**
   * Add a new webhook
   * @param url
   * @param event
   * @param description
   * @param store_log
   * @returns {Promise<void>}
   */
  async addWebhook(
    url: string,
    event?: string,
    description?: string,
    store_log?: string
  ): Promise<void> {
    if (!url || !(typeof url !== 'string')) {
      throw new TypeError('URL (string) is required.');
    }
    if (event && !(typeof event !== 'string')) {
      throw new TypeError('Event must be of type string.');
    }
    if (description && !(typeof description !== 'string')) {
      throw new TypeError('Description must be of type string.');
    }
    if (store_log && !(typeof store_log !== 'string')) {
      throw new TypeError('Store Log must be of type string.');
    }
    return new Promise<void>((resolve, reject) => {
      axios
        .post(Endpoints.ADD_WEBHOOK, {
          token: this.token,
          owner_id: this.owner_id,
          url,
          event,
          description,
          store_log
        })
        .then((res: AxiosResponse) => {
          if (res.data.status == 'error') {
            if (res.data.type == 'ValidationError') {
              reject(new ValidationError(res.data.message));
            }
            if (res.data.type == 'GeneralError') {
              reject(new GeneralError(res.data.message));
            }
            if (res.data.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.data.message));
            }
          } else {
            resolve();
          }
        });
    });
  }

  /**
   * Edit a webhook
   * @param webhook_id
   * @param url
   * @param event
   * @param description
   * @param store_log
   * @returns {Promise<void>}
   */
  async editWebhook(
    webhook_id: string,
    url: string,
    event?: string,
    description?: string,
    store_log?: string
  ): Promise<void> {
    if (!webhook_id || !(typeof webhook_id !== 'string')) {
      throw new TypeError('Webhook ID (string) is required.');
    }
    if (!url || !(typeof url !== 'string')) {
      throw new TypeError('URL (string) is required.');
    }
    if (event && !(typeof event !== 'string')) {
      throw new TypeError('Event must be of type string.');
    }
    if (description && !(typeof description !== 'string')) {
      throw new TypeError('Description must be of type string.');
    }
    if (store_log && !(typeof store_log !== 'string')) {
      throw new TypeError('Store Log must be of type string.');
    }
    return new Promise<void>((resolve, reject) => {
      axios
        .post(Endpoints.EDIT_WEBHOOK, {
          token: this.token,
          owner_id: this.owner_id,
          webhook_id,
          url,
          event,
          description,
          store_log
        })
        .then((res: AxiosResponse) => {
          if (res.data.status == 'error') {
            if (res.data.type == 'ValidationError') {
              reject(new ValidationError(res.data.message));
            }
            if (res.data.type == 'GeneralError') {
              reject(new GeneralError(res.data.message));
            }
            if (res.data.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.data.message));
            }
          } else {
            resolve();
          }
        });
    });
  }

  /**
   * Reset the key for a webhook
   * @param webhook_id
   * @returns {Promise<string>}
   */
  async keyResetWebhook(webhook_id: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      axios
        .post(Endpoints.KEY_REST_WEBHOOK, {
          token: this.token,
          owner_id: this.owner_id,
          webhook_id
        })
        .then((res: AxiosResponse) => {
          if (res.data.status == 'error') {
            if (res.data.type == 'ValidationError') {
              reject(new ValidationError(res.data.message));
            }
            if (res.data.type == 'GeneralError') {
              reject(new GeneralError(res.data.message));
            }
            if (res.data.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.data.message));
            }
          } else {
            resolve(res.data.key);
          }
        });
    });
  }

  /**
   * List all webhooks
   * @returns {Promise<any>}
   */
  async listWebhooks(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .post(Endpoints.LIST_WEBHOOKS, {
          token: this.token,
          owner_id: this.owner_id
        })
        .then((res: AxiosResponse) => {
          if (res.data.status == 'error') {
            if (res.data.type == 'ValidationError') {
              reject(new ValidationError(res.data.message));
            }
            if (res.data.type == 'GeneralError') {
              reject(new GeneralError(res.data.message));
            }
            if (res.data.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.data.message));
            }
          } else {
            let webhooks: any = [];
            res.data.webhook_list.forEach((webhook: any) => {
              webhooks?.push({
                webhook_id: webhook.webhook_id,
                url: webhook.url,
                event: webhook.event,
                description: webhook.description,
                store_log: webhook.store_log,
                create_date: parse(webhook.create_date)
              });
            });
            resolve(webhooks);
          }
        });
    });
  }
  /**
   * Delete a webhook
   * @param webhook_id
   * @returns {Promise<void>}
   */
  async deleteWebhook(webhook_id: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      axios
        .post(Endpoints.DELETE_WEBHOOK, {
          token: this.token,
          owner_id: this.owner_id,
          webhook_id
        })
        .then((res: AxiosResponse) => {
          if (res.data.status == 'error') {
            if (res.data.type == 'ValidationError') {
              reject(new ValidationError(res.data.message));
            }
            if (res.data.type == 'GeneralError') {
              reject(new GeneralError(res.data.message));
            }
            if (res.data.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.data.message));
            }
          } else {
            resolve();
          }
        });
    });
  }

  /**
   * Get Webhook Info
   * @param webhook_id
   * @returns {Promise<any>}
   */
  async getWebhookInfo(webhook_id: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .post(Endpoints.GET_WEBHOOK_INFO, {
          token: this.token,
          owner_id: this.owner_id,
          webhook_id
        })
        .then((res: AxiosResponse) => {
          if (res.data.status == 'error') {
            if (res.data.type == 'ValidationError') {
              reject(new ValidationError(res.data.message));
            }
            if (res.data.type == 'GeneralError') {
              reject(new GeneralError(res.data.message));
            }
            if (res.data.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.data.message));
            }
          } else {
            resolve(res.data.webhook_data);
          }
        });
    });
  }

  /**
   * Compose a mail
   * @param options Parameters to be used for sending mail.
   * @returns {Promise<void>}
   */
  async composeMail(options: SendMailParameters): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      axios
        .post(Endpoints.SEND_MAIL, {
          token: this.token,
          owner_id: this.owner_id,
          smtp_user_name: options.smtp_user_name,
          message: options.message
        })
        .then((res: AxiosResponse) => {
          if (res.data.status == 'error') {
            if (res.data.type == 'ValidationError') {
              reject(new ValidationError(res.data.message));
            }
            if (res.data.type == 'GeneralError') {
              reject(new GeneralError(res.data.message));
            }
            if (res.data.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.data.message));
            }
          } else {
            resolve(res.data);
          }
        });
    });
  }

  /**
   * Compose a mail using a template
   * @param options
   * @returns {Promise<void>}
   */
  async sendTemplate(options: SendTemplateMailParameters): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      axios
        .post(Endpoints.SEND_TEMPLATE, {
          token: this.token,
          owner_id: this.owner_id,
          smtp_user_name: options.smtp_user_name,
          message: options.message
        })
        .then((res: AxiosResponse) => {
          if (res.data.status == 'error') {
            if (res.data.type == 'ValidationError') {
              reject(new ValidationError(res.data.message));
            }
            if (res.data.type == 'GeneralError') {
              reject(new GeneralError(res.data.message));
            }
            if (res.data.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.data.message));
            }
          } else {
            resolve(res.data);
          }
        });
    });
  }
  /**
   * Get User Info
   * @returns {Promise<any>}
   */
  async getUserInfo(): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .post(Endpoints.VIEW_USER_DETAIL, {
          token: this.token,
          owner_id: this.owner_id
        })
        .then((res: AxiosResponse) => {
          if (res.data.status == 'error') {
            if (res.data.type == 'ValidationError') {
              reject(new ValidationError(res.data.message));
            }
            if (res.data.type == 'GeneralError') {
              reject(new GeneralError(res.data.message));
            }
            if (res.data.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.data.message));
            }
          } else {
            resolve(res.data.user_data);
          }
        });
    });
  }
}
