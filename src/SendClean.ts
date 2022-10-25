/**
 * @author Gaurish Sethia
 * @copyright 2022-current Gaurish Sethia
 */
import {
  AddSmtpSuccessResponse,
  BaseResponse,
  CheckSendingDomainResponse,
  CheckTrackingDomainResponse,
  ListSendingDomainsResponse,
  ListSmtp,
  ListSmtpResponse,
  ListTrackingDomainsResponse,
  ListWebhooksResponse,
  ResetSMTPPasswordResponse,
  SendCleanOptions,
  SendingDomainList,
  SendMailParameters,
  SendTemplateMailParameters,
  TrackingDomainList,
  UpdateSmtpParameters,
  UserInfo,
  UserInfoResponse,
  ValidEvents,
  WebhookInfo,
  WebhookInfoResponse,
  WebhookKeyResponse,
  WebhookList
} from './utils/interfaces';
import * as Endpoints from './Endpoints';
import { ValidationError } from './Errors/ValidationError';
import { GeneralError } from './Errors/GeneralError';
import { AuthenticationError } from './Errors/AuthenticationError';
import parse from './utils/parse';
import { request } from './RequestHandler';

/**
 * @class SendClean
 */
export class SendClean {
  /**
   * The User's Id For Requests.
   * @private
   * @type {string}
   * @memberof SendClean
   */
  private owner_id: string;
  /**
   * The User's API Token For Requests.
   * @private
   * @type {string}
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
    if (!hourly_limit || typeof hourly_limit !== 'number') {
      throw new TypeError('Field hourly_limit (must be a no.) is required for adding smtp user.');
    }
    if (!total_limit || typeof total_limit !== 'number') {
      throw new TypeError('Field total_limit (must be a no.) is required for adding smtp user.');
    }
    return new Promise<AddSmtpSuccessResponse>((resolve, reject) => {
      request<AddSmtpSuccessResponse>(Endpoints.ADD_SMTP_USER, 'POST', {
        token: this.token,
        owner_id: this.owner_id,
        hourly_limit,
        total_limit
      })
        .then((res) => {
          if (res.status == 'error') {
            if (res.type == 'ValidationError') {
              reject(new ValidationError(res.message));
            }
            if (res.type == 'GeneralError') {
              reject(new GeneralError(res.message));
            }
            if (res.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.message));
            }
          }
          resolve(res);
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
  async updateSmtpUser(options: UpdateSmtpParameters): Promise<void> {
    if (!options.smtp_user_name || typeof options.smtp_user_name !== 'string') {
      throw new TypeError('smtp_user_name is required and must be of type string.');
    }
    if (
      (options.hourly_limit && isNaN(options.hourly_limit)) ||
      (options.total_limit && isNaN(options.total_limit))
    ) {
      throw new TypeError('Field hourly_limit and total_limit must be a number.');
    }
    return new Promise<void>((resolve, reject) => {
      request<BaseResponse>(Endpoints.UPDATE_SMTP_USER, 'POST', {
        token: this.token,
        owner_id: this.owner_id,
        ...options
      })
        .then((res) => {
          if (res.status == 'error') {
            if (res.type == 'ValidationError') {
              reject(new ValidationError(res.message));
            }
            if (res.type == 'GeneralError') {
              reject(new GeneralError(res.message));
            }
            if (res.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.message));
            }
          }
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * Reset Smtp Password
   * @param smtp_user_name
   * @async
   * @returns {Promise<any>}
   */
  async resetSmtpPassword(smtp_user_name: string): Promise<string> {
    if (!smtp_user_name || typeof smtp_user_name !== 'string') {
      throw new TypeError('smtp_user_name is required.');
    }
    return new Promise<string>((resolve, reject) => {
      request<ResetSMTPPasswordResponse>(Endpoints.RESET_SMTP_PASSWORD, 'POST', {
        token: this.token,
        owner_id: this.owner_id,
        smtp_user_name
      })
        .then((res) => {
          if (res.status == 'error') {
            if (res.type == 'ValidationError') {
              reject(new ValidationError(res.message));
            }
            if (res.type == 'GeneralError') {
              reject(new GeneralError(res.message));
            }
            if (res.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.message));
            }
          }
          resolve(res.smtp_password);
        })
        .catch((err) => {
          reject(err);
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
      request<ListSmtpResponse>(Endpoints.LIST_SMTP_USERS, 'POST', {
        token: this.token,
        owner_id: this.owner_id
      })
        .then((res) => {
          if (res.status == 'error') {
            if (res.type == 'ValidationError') {
              reject(new ValidationError(res.message));
            }
            if (res.type == 'GeneralError') {
              reject(new GeneralError(res.message));
            }
            if (res.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.message));
            }
          }
          resolve(res.smtp_list);
        })
        .catch((err) => {
          reject(err);
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
    if (!domain || typeof domain !== 'string') {
      throw new TypeError('Domain is required and must be of type string.');
    }
    return new Promise<void>((resolve, reject) => {
      request<BaseResponse>(Endpoints.ADD_SENDING_DOMAIN, 'POST', {
        token: this.token,
        owner_id: this.owner_id,
        domain
      })
        .then((res) => {
          if (res.status == 'error') {
            if (res.type == 'ValidationError') {
              reject(new ValidationError(res.message));
            }
            if (res.type == 'GeneralError') {
              reject(new GeneralError(res.message));
            }
            if (res.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.message));
            }
          }
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * Check For Sending Domain
   * @param domain
   * @async
   * @returns {Promise<checkSendingDomainResponse>}
   */
  async checkSendingDomain(domain: string): Promise<CheckSendingDomainResponse> {
    if (!domain || typeof domain !== 'string') {
      throw new TypeError('Domain (string) is required.');
    }
    return new Promise<CheckSendingDomainResponse>((resolve, reject) => {
      request<CheckSendingDomainResponse>(Endpoints.CHECK_SENDING_DOMAIN, 'POST', {
        token: this.token,
        owner_id: this.owner_id,
        domain
      })
        .then((res) => {
          if (res.status == 'error') {
            if (res.type == 'ValidationError') {
              reject(new ValidationError(res.message));
            }
            if (res.type == 'GeneralError') {
              reject(new GeneralError(res.message));
            }
            if (res.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.message));
            }
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * Verify Sending Domain
   * @param domain
   * @async
   * @returns {Promise<any>}
   */
  async verifySendingDomain(domain: string): Promise<void> {
    if (!domain || typeof domain !== 'string') {
      throw new TypeError('Domain is required and must be of type string.');
    }

    return new Promise<void>((resolve, reject) => {
      request<BaseResponse>(Endpoints.VERIFY_SENDING_DOMAIN, 'POST', {
        token: this.token,
        owner_id: this.owner_id,
        domain
      })
        .then((res) => {
          if (res.status == 'error') {
            if (res.type == 'ValidationError') {
              reject(new ValidationError(res.message));
            }
            if (res.type == 'GeneralError') {
              reject(new GeneralError(res.message));
            }
            if (res.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.message));
            }
          }
          resolve();
        })
        .catch((err) => {
          reject(err);
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
      request<ListSendingDomainsResponse>(Endpoints.LIST_SENDING_DOMAIN, 'POST', {
        token: this.token,
        owner_id: this.owner_id
      })
        .then((res) => {
          if (res.status == 'error') {
            if (res.type == 'ValidationError') {
              reject(new ValidationError(res.message));
            }
            if (res.type == 'GeneralError') {
              reject(new GeneralError(res.message));
            }
            if (res.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.message));
            }
          }
          resolve(
            res.sending_domain_list.map((domain) => {
              return {
                ...domain,
                create_date: parse(domain.create_date)
              };
            })
          );
        })
        .catch((err) => {
          reject(err);
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
    if (!domain || typeof domain !== 'string') {
      throw new TypeError('Domain is required and must be of type string.');
    }
    return new Promise<void>((resolve, reject) => {
      request<BaseResponse>(Endpoints.DELETE_SENDING_DOMAIN, 'POST', {
        token: this.token,
        owner_id: this.owner_id,
        domain
      })
        .then((res) => {
          if (res.status == 'error') {
            if (res.type == 'ValidationError') {
              reject(new ValidationError(res.message));
            }
            if (res.type == 'GeneralError') {
              reject(new GeneralError(res.message));
            }
            if (res.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.message));
            }
          }
          resolve();
        })
        .catch((err) => {
          reject(err);
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
    if (!domain || typeof domain !== 'string') {
      throw new TypeError('Domain is required and must be of type string.');
    }
    return new Promise<void>((resolve, reject) => {
      request<BaseResponse>(Endpoints.ADD_TRACKING_DOMAIN, 'POST', {
        token: this.token,
        owner_id: this.owner_id,
        domain
      })
        .then((res) => {
          if (res.status == 'error') {
            if (res.type == 'ValidationError') {
              reject(new ValidationError(res.message));
            }
            if (res.type == 'GeneralError') {
              reject(new GeneralError(res.message));
            }
            if (res.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.message));
            }
          }
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * Check Tracking Domain
   * @param domain
   * @async
   * @returns {Promise<CheckTrackingDomainResponse>}
   */
  async checkTrackingDomain(domain: string): Promise<CheckTrackingDomainResponse> {
    if (!domain || typeof domain !== 'string') {
      throw new TypeError('Domain is required and must be of type string.');
    }
    return new Promise<CheckTrackingDomainResponse>((resolve, reject) => {
      request<CheckTrackingDomainResponse>(Endpoints.CHECK_TRACKING_DOMAIN, 'POST', {
        token: this.token,
        owner_id: this.owner_id,
        domain
      })
        .then((res) => {
          if (res.status == 'error') {
            if (res.type == 'ValidationError') {
              reject(new ValidationError(res.message));
            }
            if (res.type == 'GeneralError') {
              reject(new GeneralError(res.message));
            }
            if (res.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.message));
            }
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
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
      request<ListTrackingDomainsResponse>(Endpoints.LIST_TRACKING_DOMAIN, 'POST', {
        token: this.token,
        owner_id: this.owner_id
      })
        .then((res) => {
          if (res.status == 'error') {
            if (res.type == 'ValidationError') {
              reject(new ValidationError(res.message));
            }
            if (res.type == 'GeneralError') {
              reject(new GeneralError(res.message));
            }
            if (res.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.message));
            }
          }
          resolve(
            res.tracking_domain_list.map((domain) => {
              return {
                ...domain,
                create_date: parse(domain.create_date)
              };
            })
          );
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * Delete a tracking domain
   * @param domain
   * @returns {Promise<void>}
   */
  async deleteTrackingDomain(domain: string): Promise<void> {
    if (!domain || typeof domain !== 'string') {
      throw new TypeError('Domain is required and must be of type string.');
    }
    return new Promise<void>((resolve, reject) => {
      request<BaseResponse>(Endpoints.DELETE_TRACKING_DOMAIN, 'POST', {
        token: this.token,
        owner_id: this.owner_id,
        domain
      })
        .then((res) => {
          if (res.status == 'error') {
            if (res.type == 'ValidationError') {
              reject(new ValidationError(res.message));
            }
            if (res.type == 'GeneralError') {
              reject(new GeneralError(res.message));
            }
            if (res.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.message));
            }
          }
          resolve();
        })
        .catch((err) => {
          reject(err);
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
    events?: ValidEvents,
    description?: string,
    store_log?: string
  ): Promise<void> {
    if (!url || typeof url !== 'string') {
      throw new TypeError('URL (string) is required.');
    }
    if (events && !Array.isArray(events)) {
      throw new TypeError('Events must be of type array.');
    }
    if (description && typeof description !== 'string') {
      throw new TypeError('Description must be of type string.');
    }
    if (store_log && typeof store_log !== 'string') {
      throw new TypeError('Store Log must be of type string.');
    }
    return new Promise<void>((resolve, reject) => {
      request<BaseResponse>(Endpoints.ADD_WEBHOOK, 'POST', {
        token: this.token,
        owner_id: this.owner_id,
        url,
        event: events?.join(','),
        description,
        store_log
      })
        .then((res) => {
          if (res.status == 'error') {
            if (res.type == 'ValidationError') {
              reject(new ValidationError(res.message));
            }
            if (res.type == 'GeneralError') {
              reject(new GeneralError(res.message));
            }
            if (res.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.message));
            }
          }
          resolve();
        })
        .catch((err) => {
          reject(err);
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
    events?: ValidEvents,
    description?: string,
    store_log?: string
  ): Promise<void> {
    if (!webhook_id || typeof webhook_id !== 'string') {
      throw new TypeError('Webhook ID (string) is required.');
    }
    if (!url || typeof url !== 'string') {
      throw new TypeError('URL (string) is required.');
    }
    if (events && !Array.isArray(events)) {
      throw new TypeError('Events must be of type array.');
    }
    if (description && typeof description !== 'string') {
      throw new TypeError('Description must be of type string.');
    }
    if (store_log && typeof store_log !== 'string') {
      throw new TypeError('Store Log must be of type string.');
    }
    return new Promise<void>((resolve, reject) => {
      request<BaseResponse>(Endpoints.EDIT_WEBHOOK, 'POST', {
        token: this.token,
        owner_id: this.owner_id,
        webhook_id,
        url,
        event: events?.join(','),
        description,
        store_log
      })
        .then((res) => {
          if (res.status == 'error') {
            if (res.type == 'ValidationError') {
              reject(new ValidationError(res.message));
            }
            if (res.type == 'GeneralError') {
              reject(new GeneralError(res.message));
            }
            if (res.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.message));
            }
          }
          resolve();
        })
        .catch((err) => {
          reject(err);
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
      request<WebhookKeyResponse>(Endpoints.KEY_REST_WEBHOOK, 'POST', {
        token: this.token,
        owner_id: this.owner_id,
        webhook_id
      })
        .then((res) => {
          if (res.status == 'error') {
            if (res.type == 'ValidationError') {
              reject(new ValidationError(res.message));
            }
            if (res.type == 'GeneralError') {
              reject(new GeneralError(res.message));
            }
            if (res.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.message));
            }
          }
          resolve(res.key);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * List all webhooks
   * @returns {Promise<Array<WebhookList>>}
   */
  async listWebhooks(): Promise<Array<WebhookList>> {
    return new Promise<Array<WebhookList>>((resolve, reject) => {
      request<ListWebhooksResponse>(Endpoints.LIST_WEBHOOKS, 'POST', {
        token: this.token,
        owner_id: this.owner_id
      })
        .then((res) => {
          if (res.status == 'error') {
            if (res.type == 'ValidationError') {
              reject(new ValidationError(res.message));
            }
            if (res.type == 'GeneralError') {
              reject(new GeneralError(res.message));
            }
            if (res.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.message));
            }
          }
          resolve(
            res.webhook_list.map((webhook) => {
              return {
                ...webhook,
                events: webhook.event.split(',').map((event) => event as ValidEvents),
                store_log: webhook.store_log == 'Enable' ? true : false,
                create_date: parse(webhook.create_date)
              };
            })
          );
        })
        .catch((err) => {
          reject(err);
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
      request<BaseResponse>(Endpoints.DELETE_WEBHOOK, 'POST', {
        token: this.token,
        owner_id: this.owner_id,
        webhook_id
      })
        .then((res) => {
          if (res.status == 'error') {
            if (res.type == 'ValidationError') {
              reject(new ValidationError(res.message));
            }
            if (res.type == 'GeneralError') {
              reject(new GeneralError(res.message));
            }
            if (res.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.message));
            }
          }
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * Get Webhook Info
   * @param webhook_id
   * @returns {Promise<WebhookInfo>}
   */
  async getWebhookInfo(webhook_id: string): Promise<WebhookInfo> {
    return new Promise<WebhookInfo>((resolve, reject) => {
      request<WebhookInfoResponse>(Endpoints.GET_WEBHOOK_INFO, 'POST', {
        token: this.token,
        owner_id: this.owner_id,
        webhook_id
      })
        .then((res) => {
          if (res.status == 'error') {
            if (res.type == 'ValidationError') {
              reject(new ValidationError(res.message));
            }
            if (res.type == 'GeneralError') {
              reject(new GeneralError(res.message));
            }
            if (res.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.message));
            }
          }
          resolve({
            ...res.webhook_data,
            events: res.webhook_data.event.split(',').map((event) => event as ValidEvents),
            store_log: res.webhook_data.store_log == 'Enable' ? true : false,
            create_date: parse(res.webhook_data.create_date)
          });
        })
        .catch((err) => {
          reject(err);
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
      request<BaseResponse>(Endpoints.SEND_MAIL, 'POST', {
        token: this.token,
        owner_id: this.owner_id,
        ...options
      })
        .then((res) => {
          if (res.status == 'error') {
            if (res.type == 'ValidationError') {
              reject(new ValidationError(res.message));
            }
            if (res.type == 'GeneralError') {
              reject(new GeneralError(res.message));
            }
            if (res.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.message));
            }
          }
          resolve();
        })
        .catch((err) => {
          reject(err);
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
      request<BaseResponse>(Endpoints.SEND_TEMPLATE, 'POST', {
        token: this.token,
        owner_id: this.owner_id,
        ...options
      })
        .then((res) => {
          if (res.status == 'error') {
            if (res.type == 'ValidationError') {
              reject(new ValidationError(res.message));
            }
            if (res.type == 'GeneralError') {
              reject(new GeneralError(res.message));
            }
            if (res.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.message));
            }
          }
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  /**
   * Get User Info
   * @returns {Promise<UserInfo>}
   */
  async getUserInfo(): Promise<UserInfo> {
    return new Promise<UserInfo>((resolve, reject) => {
      request<UserInfoResponse>(Endpoints.VIEW_USER_DETAIL, 'POST', {
        token: this.token,
        owner_id: this.owner_id
      })
        .then((res) => {
          if (res.status == 'error') {
            if (res.type == 'ValidationError') {
              reject(new ValidationError(res.message));
            }
            if (res.type == 'GeneralError') {
              reject(new GeneralError(res.message));
            }
            if (res.type == 'AuthenticationError') {
              reject(new AuthenticationError(res.message));
            }
          }
          resolve({
            ...res.user_data,
            create_date: parse(res.user_data.create_date)
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
