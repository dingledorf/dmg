import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateHardware1699191851454 implements MigrationInterface {
    name = 'CreateHardware1699191851454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hardware" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "location" text NOT NULL, "hashRate" numeric(15,12) NOT NULL, CONSTRAINT "PK_3334ecf6c630e1fb3442e88a31e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fedf20d0e0e51c56ed43ad22dc" ON "hardware" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_04bead9fe0512e8dced7fa0f67" ON "hardware" ("location") `);

        if(process.env.APP_ENV === 'development') {
            await queryRunner.query(
              `
        INSERT INTO "hardware" ("name", "location", "hashRate") VALUES 
        ('Antminer S1', 'Mining Facility C', 95.47337585632621),
        ('Antminer S2', 'Mining Facility F', 63.124653604061336),
        ('Antminer S3', 'Mining Facility B', 150.0160810465253),
        ('Antminer S4', 'Mining Facility C', 129.9991929861352),
        ('Antminer S5', 'Mining Facility C', 89.89673834028852),
        ('Antminer S6', 'Mining Facility A', 119.75219585930984),
        ('Antminer S7', 'Mining Facility C', 177.73249985564564),
        ('Antminer S8', 'Mining Facility B', 171.52280818167156),
        ('Antminer S9', 'Mining Facility A', 74.60731729087343),
        ('Antminer S10', 'Mining Facility B', 180.02524149781846),
        ('Antminer S11', 'Mining Facility A', 199.45025081508592),
        ('Antminer S12', 'Mining Facility C', 74.44729229444378),
        ('Antminer S13', 'Mining Facility B', 136.30782054928818),
        ('Antminer S14', 'Mining Facility C', 142.48412073650863),
        ('Antminer S15', 'Mining Facility C', 62.464767881082736),
        ('Antminer S16', 'Mining Facility A', 99.03188491937291),
        ('Antminer S17', 'Mining Facility A', 81.77582864149117),
        ('Antminer S18', 'Mining Facility B', 167.1921699219566),
        ('Antminer S19', 'Mining Facility A', 195.20203815318223),
        ('Antminer S20', 'Mining Facility A', 66.12278700825286),
        ('Antminer S21', 'Mining Facility C', 51.056059711425526),
        ('Antminer S22', 'Mining Facility A', 126.13131212154948),
        ('Antminer S23', 'Mining Facility C', 50.36183737814562),
        ('Antminer S24', 'Mining Facility C', 197.00269471979692),
        ('Antminer S25', 'Mining Facility C', 94.79672000946542),
        ('Antminer S26', 'Mining Facility A', 59.53215896298039),
        ('Antminer S27', 'Mining Facility B', 133.92114717678868),
        ('Antminer S28', 'Mining Facility A', 54.44132728352372),
        ('Antminer S29', 'Mining Facility B', 111.41241501659705),
        ('Antminer S30', 'Mining Facility B', 170.96441047370985),
        ('Antminer S31', 'Mining Facility A', 77.96597892159402),
        ('Antminer S32', 'Mining Facility A', 172.5679584627439),
        ('Antminer S33', 'Mining Facility B', 97.62376788480307),
        ('Antminer S34', 'Mining Facility B', 155.7351177143219),
        ('Antminer S35', 'Mining Facility B', 72.51441805891815),
        ('Antminer S36', 'Mining Facility C', 192.85518250537893),
        ('Antminer S37', 'Mining Facility A', 118.81691947450298),
        ('Antminer S38', 'Mining Facility C', 113.25851550484796),
        ('Antminer S39', 'Mining Facility C', 88.20287234406001),
        ('Antminer S40', 'Mining Facility A', 75.58964436850513),
        ('Antminer S41', 'Mining Facility B', 118.33447532022224),
        ('Antminer S42', 'Mining Facility C', 76.58643260672552),
        ('Antminer S43', 'Mining Facility B', 100.39759580736879),
        ('Antminer S44', 'Mining Facility C', 68.09202633689665),
        ('Antminer S45', 'Mining Facility C', 115.92681003843784),
        ('Antminer S46', 'Mining Facility B', 110.42429289777543),
        ('Antminer S47', 'Mining Facility A', 60.763894911503236),
        ('Antminer S48', 'Mining Facility B', 65.58413626321806),
        ('Antminer S49', 'Mining Facility B', 176.67947782024896),
        ('Antminer S50', 'Mining Facility C', 86.69555233014857),
        ('Antminer S51', 'Mining Facility A', 79.11407731219045),
        ('Antminer S52', 'Mining Facility C', 139.84981627168122),
        ('Antminer S53', 'Mining Facility C', 108.8508012734221),
        ('Antminer S54', 'Mining Facility C', 124.01236768066194),
        ('Antminer S55', 'Mining Facility C', 50.728606175594045),
        ('Antminer S56', 'Mining Facility C', 70.45330711300662),
        ('Antminer S57', 'Mining Facility B', 135.5781885540436),
        ('Antminer S58', 'Mining Facility C', 186.3942395841729),
        ('Antminer S59', 'Mining Facility C', 143.59418053613734),
        ('Antminer S60', 'Mining Facility B', 162.87362569298662),
        ('Antminer S61', 'Mining Facility C', 144.95504593026277),
        ('Antminer S62', 'Mining Facility A', 178.20560698039458),
        ('Antminer S63', 'Mining Facility C', 133.74935224238772),
        ('Antminer S64', 'Mining Facility C', 73.23404454957276),
        ('Antminer S65', 'Mining Facility A', 102.779180521678),
        ('Antminer S66', 'Mining Facility C', 68.91290484690525),
        ('Antminer S67', 'Mining Facility A', 55.65660634453676),
        ('Antminer S68', 'Mining Facility C', 173.29330483724993),
        ('Antminer S69', 'Mining Facility A', 146.27997541403693),
        ('Antminer S70', 'Mining Facility A', 58.3958867101871),
        ('Antminer S71', 'Mining Facility B', 86.46253273077275),
        ('Antminer S72', 'Mining Facility C', 77.28540406465844),
        ('Antminer S73', 'Mining Facility C', 172.26687779581303),
        ('Antminer S74', 'Mining Facility A', 52.28762549142741),
        ('Antminer S75', 'Mining Facility B', 80.44420373345424),
        ('Antminer S76', 'Mining Facility A', 189.57567630381706),
        ('Antminer S77', 'Mining Facility A', 111.00872291123875),
        ('Antminer S78', 'Mining Facility C', 87.52009239711012),
        ('Antminer S79', 'Mining Facility C', 151.4329598045196),
        ('Antminer S80', 'Mining Facility C', 193.12417617718205),
        ('Antminer S81', 'Mining Facility B', 95.4548981612894),
        ('Antminer S82', 'Mining Facility B', 110.84016649913389),
        ('Antminer S83', 'Mining Facility B', 154.82937885619447),
        ('Antminer S84', 'Mining Facility B', 73.15381379928401),
        ('Antminer S85', 'Mining Facility A', 176.2139560812601),
        ('Antminer S86', 'Mining Facility C', 77.47946931461922),
        ('Antminer S87', 'Mining Facility A', 95.046546388749),
        ('Antminer S88', 'Mining Facility B', 68.30781264535506),
        ('Antminer S89', 'Mining Facility C', 58.3387945317631),
        ('Antminer S90', 'Mining Facility C', 56.63901687636445),
        ('Antminer S91', 'Mining Facility A', 130.21724693362052),
        ('Antminer S92', 'Mining Facility B', 187.61547254992553),
        ('Antminer S94', 'Mining Facility B', 97.76772735475907)
        `,
              undefined,
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_04bead9fe0512e8dced7fa0f67"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fedf20d0e0e51c56ed43ad22dc"`);
        await queryRunner.query(`DROP TABLE "hardware"`);
    }

}
