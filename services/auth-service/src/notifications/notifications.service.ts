import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Twilio from 'twilio';

export interface SendNotificationDto {
  to: string;
  message: string;
}

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  private client: Twilio.Twilio | null = null;

  constructor(private config: ConfigService) {
    const sid = config.get('TWILIO_ACCOUNT_SID');
    const token = config.get('TWILIO_AUTH_TOKEN');
    if (sid && token && !sid.includes('xxx')) {
      this.client = Twilio(sid, token);
      this.logger.log('Twilio client initialized');
    } else {
      this.logger.warn('Twilio not configured - notifications will be logged only');
    }
  }

  async sendWhatsApp(dto: SendNotificationDto) {
    const from = this.config.get('TWILIO_WHATSAPP_FROM', 'whatsapp:+14155238886');

    if (!this.client) {
      this.logger.log(`[DEV] WhatsApp to ${dto.to}: ${dto.message}`);
      return { success: true, provider: 'dev', to: dto.to };
    }

    const result = await this.client.messages.create({
      from,
      to: `whatsapp:${dto.to}`,
      body: dto.message,
    });

    this.logger.log(`WhatsApp sent: ${result.sid}`);
    return { success: true, provider: 'twilio', sid: result.sid, to: dto.to };
  }

  async sendSMS(dto: SendNotificationDto) {
    const from = this.config.get('TWILIO_SMS_FROM');

    if (!this.client || !from) {
      this.logger.log(`[DEV] SMS to ${dto.to}: ${dto.message}`);
      return { success: true, provider: 'dev', to: dto.to };
    }

    const result = await this.client.messages.create({
      from,
      to: dto.to,
      body: dto.message,
    });

    this.logger.log(`SMS sent: ${result.sid}`);
    return { success: true, provider: 'twilio', sid: result.sid, to: dto.to };
  }

  buildReservationConfirmation(data: {
    nombre: string;
    fecha: string;
    hora: string;
    mesa: number;
    personas: number;
  }): string {
    return (
      `Hola ${data.nombre}! Tu reservacion esta confirmada.\n` +
      `Fecha: ${data.fecha}\n` +
      `Hora: ${data.hora}\n` +
      `Mesa: ${data.mesa}\n` +
      `Personas: ${data.personas}\n` +
      `Te esperamos!`
    );
  }
}
