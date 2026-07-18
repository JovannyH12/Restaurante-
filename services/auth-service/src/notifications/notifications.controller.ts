import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { SendNotificationDto } from './dto/send-notification.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('whatsapp')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Enviar confirmacion por WhatsApp (HU-04)' })
  sendWhatsApp(@Body() dto: SendNotificationDto) {
    return this.notificationsService.sendWhatsApp(dto);
  }

  @Post('sms')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Enviar confirmacion por SMS' })
  sendSMS(@Body() dto: SendNotificationDto) {
    return this.notificationsService.sendSMS(dto);
  }
}
