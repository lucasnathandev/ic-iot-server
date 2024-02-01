import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  getTracker(req: Record<string, any>): Promise<string> {
    const tracker = req.ips.length > 0 ? req.ips[0] : req.ip;

    return tracker;
  }
}
