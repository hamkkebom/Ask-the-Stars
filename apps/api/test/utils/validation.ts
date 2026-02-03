import { validate } from 'class-validator';

export const validateDto = async (dto: object) => validate(dto);
