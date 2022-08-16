import { ApiProperty } from '@nestjs/swagger';

import { Widget } from './widget';

export class Dashboard {
    @ApiProperty({
        example: '3v3r2b3rb3fvf238f3gugfv',
        description: 'Dashboard id'
    })
    id: string;

    @ApiProperty({
        example: 'Campaign dashboard',
        description: 'Name of the dashboard'
    })
    name: string;

    @ApiProperty({
        example: 1234562345,
        description: 'Dashboard from date'
    })
    daterangefrom: number;

    @ApiProperty({
        example: 1234562345,
        description: 'Dashboard to date'
    })
    daterangeto: number;

    @ApiProperty({
        example: [Widget],
        description: 'Dashboard widgets'
    })
    widgets: Widget[];
}