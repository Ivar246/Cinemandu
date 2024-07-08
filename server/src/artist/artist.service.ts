import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddArtistDto } from './dto/addArtist.dto';
import { profile } from 'console';
import { Artist_Role, Prisma } from '@prisma/client';

@Injectable()
export class ArtistService {

    constructor(private prisma: PrismaService) { }
    async getArtist(artist_id: number) {
        try {
            const artist = await this.prisma.artist.findUnique({
                where: { id: artist_id },
                include: { roles: { include: { role: true } } }
            });

            if (!artist) throw new NotFoundException(`artist with the id ${artist_id} not found`);

            const result = { ...artist, roles: artist.roles.map(r => r.role) };

            return { data: result, message: "artist fetched successfully" }
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async getAllArtist() {
        try {
            const artists = await this.prisma.artist.findMany({
                include: { roles: { include: { role: true } } }
            });

            const transformedResult = artists.map(artist => {
                return { ...artist, roles: artist.roles.map(r => r.role) }
            });

            return { data: transformedResult, message: "Artists fetched successfully." }

        } catch (error) {

        }
    }

    async addArtist(addArtistDto: AddArtistDto) {
        const { artist_name, DOB, profile_url, profile_summary, roleIds } = addArtistDto;

        try {
            const roles = await this.prisma.role.findMany({
                where: {
                    id: { in: roleIds }
                }
            });

            if (roles.length !== roleIds.length)
                throw new BadRequestException("One or more role not found");

            const artist = await this.prisma.artist.create({
                data: {
                    artist_name: artist_name,
                    DOB,
                    profile_url,
                    profile_summary,
                    roles: {
                        create: roles.map((r) => ({ role: { connect: { id: r.id } } }))
                    }
                },
                select: {
                    id: true,
                    artist_name: true,
                    DOB: true,
                    profile_summary: true,
                    roles: {
                        select: {
                            role: true
                        }
                    }
                }
            });
            let result = Object(artist)


            result.roles = result.roles.map(r => r['role'])

            return { data: result, message: "artist created successfully." }
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    async updateArtist() {

    }

    async deleteArtist() {

    }

}
