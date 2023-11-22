import { inject, injectable } from 'inversify';
import express, { Express } from 'express';
import { ILogger, IConfig, RestSchema, IDatabaseClient, IController } from '../../shared/libs/index.js';
import { Component } from '../../shared/types/index.js';
import { getMongoURI } from '../../shared/utils/index.js';

@injectable()
export class RestApplication {
  private server: Express;

  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Config) private readonly config: IConfig<RestSchema>,
    @inject(Component.DatabaseClient) private readonly database: IDatabaseClient,
    @inject(Component.OfferController) private readonly offerController: IController,
  ) {
    this.server = express();
  }

  public async init () {
    this.logger.info('Application initialized');
    this.logger.info(`$PORT: ${this.config.get('PORT')}`);

    this.logger.info('Trying to connect to Database...');
    await this.initDabase();
    this.logger.info('Database connection established successfully');

    this.logger.info('Trying to init server...');
    await this.initServer();
    this.logger.info(`🚀 Server started on http://localhost:${this.config.get('PORT')}`);

    this.logger.info('Init controllers');
    await this.initControllers();
    this.logger.info('Controller initialization completed');

  }

  private async initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  private async initDabase() {
    const connString = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    await this.database.connect(connString);
  }

  private async initControllers() {
    this.server.use('/offers', this.offerController.router);
  }
}
