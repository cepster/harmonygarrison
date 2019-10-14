import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { SongsController } from "./songs/songs.controller";
import { SongsService } from "./songs/songs.service";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ServeStaticModule.forRoot({
      rootPath: join(
        __dirname,
        "..",
        "..",
        "garrison-ui",
        "dist",
        "garrison-ui",
      ),
    }),
  ],
  controllers: [AppController, SongsController],
  providers: [AppService, SongsService],
})
export class AppModule {}
