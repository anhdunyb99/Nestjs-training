import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Tạo một custom decorator dựa trên createParamDecorator
export const CustomDecorator = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    // Lấy request từ context execution
    const request = ctx.switchToHttp().getRequest();

    // Trả về giá trị cần thiết từ request hoặc từ data
    if (data) {
      return request[data];
    }

    // Trả về toàn bộ request
    return request;
  },
);
