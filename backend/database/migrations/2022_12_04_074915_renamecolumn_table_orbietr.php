<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('orbits', function (Blueprint $table) {
            //Schema::rename("StormEyeID", "DisasterTimeID");
            $table->dropColumn("StormEyeID");
            $table->integer("DisasterTimeID");

            //
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('orbits', function (Blueprint $table) {
            //
        });
    }
};