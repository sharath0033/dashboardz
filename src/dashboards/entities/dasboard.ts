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
        example: ['2022-08-18T03:05:00+05:30', '2022-08-18T03:05:00+05:30'],
        description: 'Dashboard date range'
    })
    daterange?: string[];

    @ApiProperty({
        example: [Widget],
        description: 'Dashboard widgets'
    })
    widgets?: Widget[];
}